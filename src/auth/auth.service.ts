import { LoginRequest } from '@/auth/dto/login.dto';
import { RegisterRequest } from '@/auth/dto/register.dto';
import {
  ForgotPasswordDto,
  ResetPasswordDto,
} from '@/auth/dto/reset.password.dto';
import { JwtPayload } from '@/auth/interfaces/jwt.interface';
import { MailService } from '@/mail/mail.service';
import { PrismaService } from '@/prisma/prisma.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import type { Request, Response } from 'express';
import { StringValue } from 'ms';

interface ResetTokenPayload {
  id: string;
  purpose: 'password-reset';
}

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;
  private readonly COOKIE_DOMAIN: string;
  private readonly isProduction: boolean;

  private setCookie(res: Response, value: string, expires: Date) {
    res.cookie('refreshToken', value, {
      httpOnly: true,
      expires,
      sameSite: this.isProduction ? 'none' : 'lax',
      secure: this.isProduction,
      ...(this.isProduction && { domain: this.COOKIE_DOMAIN }),
    });
  }
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_ACCESS_TOKEN_TTL',
    );
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_REFRESH_TOKEN_TTL',
    );
    this.COOKIE_DOMAIN = configService.getOrThrow<string>('COOKIE_DOMAIN');
    this.isProduction =
      configService.getOrThrow<string>('NODE_ENV') === 'production';
  }

  async register(res: Response, dto: RegisterRequest) {
    const { fullName, email } = dto;
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }
    const generatedPassword = randomBytes(6).toString('hex');

    const hashedPassword = await bcrypt.hash(generatedPassword, 10);
    const user = await this.prismaService.user.create({
      data: {
        fullName,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: 'USER',
      },
    });
    const bestResult = await this.prismaService.bestResult.create({
      data: {
        userId: user.id,
        backendAchievedAt: new Date(),
        frontendAchievedAt: new Date(),
        mobileAchievedAt: new Date(),
        bestBackendScore: 0,
        bestFrontendScore: 0,
        bestMobileScore: 0,
      },
    });

    this.mailService
      .sendWelcomeEmail(user.email, user.fullName, generatedPassword)
      .catch((err) => console.error('Ошибка отправки письма:', err));

    return {
      user: { ...user, password: undefined, bestResult },
    };
  }
  async refresh(res: Response, req: Request) {
    const refreshToken = req.cookies['refreshToken'] as string;
    if (!refreshToken) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
    let payload: JwtPayload;
    try {
      payload = await this.jwtService.verifyAsync(refreshToken);
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: payload.id },
      select: { id: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.auth(res, payload.id);
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const { email } = dto;

    const user = await this.prismaService.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return {
        message: 'Если аккаунт существует, письмо для сброса отправлено',
      };
    }

    const resetPayload: ResetTokenPayload = {
      id: user.id,
      purpose: 'password-reset',
    };
    const resetToken = this.jwtService.sign(resetPayload, {
      expiresIn: '15m' as StringValue,
    });

    this.mailService
      .sendPasswordResetEmail(user.email, user.fullName, resetToken)
      .catch((err) => console.error('Ошибка отправки письма сброса:', err));

    return { message: 'Если аккаунт существует, письмо для сброса отправлено' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const { token, newPassword, confirmPassword } = dto;

    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Пароли не совпадают');
    }

    let payload: ResetTokenPayload;
    try {
      payload = await this.jwtService.verifyAsync<ResetTokenPayload>(token);
    } catch {
      throw new UnauthorizedException(
        'Токен сброса пароля невалиден или истёк',
      );
    }

    if (payload.purpose !== 'password-reset') {
      throw new UnauthorizedException(
        'Токен сброса пароля невалиден или истёк',
      );
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: payload.id },
    });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.prismaService.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    this.mailService
      .sendPasswordChangedEmail(user.email, user.fullName)
      .catch((err) =>
        console.error('Ошибка отправки подтверждения смены пароля:', err),
      );

    return { message: 'Пароль успешно изменён' };
  }

  private auth(res: Response, id: string) {
    const { accessToken, refreshToken } = this.generateTokens(id);
    this.setCookie(
      res,
      refreshToken,
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    );
    return { accessToken };
  }
  private generateTokens(id: string) {
    const payload: JwtPayload = { id };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL as StringValue,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL as StringValue,
    });
    return { accessToken, refreshToken };
  }
  async login(res: Response, dto: LoginRequest) {
    const { email, password } = dto;
    const user = await this.prismaService.user.findUnique({
      where: { email: email.toLowerCase() },
      include: { bestResult: true },
    });

    if (!user) {
      throw new NotFoundException('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new NotFoundException('Invalid email or password');
    }

    return {
      user: { ...user, password: undefined },
      tokens: this.auth(res, user.id),
    };
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async logout(res: Response) {
    this.setCookie(res, '', new Date(0));
    return { message: 'Logged out successfully' };
  }
}
