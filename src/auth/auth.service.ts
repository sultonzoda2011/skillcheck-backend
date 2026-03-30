import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import { StringValue } from 'ms';
import { LoginRequest } from 'src/auth/dto/login.dto';
import { RegisterRequest } from 'src/auth/dto/register.dto';
import { JwtPayload } from 'src/auth/interfaces/jwt.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { isDev } from 'src/utils/is-dev.util';
@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: string;
  private readonly JWT_REFRESH_TOKEN_TTL: string;
  private readonly COOKIE_DOMAIN: string;
  private setCookie(res: Response, value: string, expires: Date) {
    res.cookie('refreshToken', value, {
      httpOnly: true,
      secure: !isDev(this.configService),
      domain: this.COOKIE_DOMAIN,
      expires,
      sameSite: isDev(this.configService) ? 'none' : 'lax',
    });
  }
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_ACCESS_TOKEN_TTL',
    );
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<string>(
      'JWT_REFRESH_TOKEN_TTL',
    );
    this.COOKIE_DOMAIN = configService.getOrThrow<string>('COOKIE_DOMAIN');
  }

  async register(res: Response, dto: RegisterRequest) {
    const { fullName, email, password } = dto;
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const isAdminEmail = email.toLowerCase() === 'admin@tjk.com';
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prismaService.user.create({
      data: {
        fullName,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: isAdminEmail ? 'ADMIN' : 'USER',
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

    return {
      user: { ...user, password: undefined, bestResult },
      tokens: this.auth(res, user.id),
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
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
    if (payload) {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: payload.id,
        },
        select: {
          id: true,
        },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }
    }
    return this.auth(res, payload.id);
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
    this.setCookie(res, 'refreshToken', new Date(0));
    return { message: 'Logged out successfully' };
  }
}
