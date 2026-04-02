import {
  ForgotPasswordDto,
  ResetPasswordDto,
} from '@/auth/dto/reset.password.dto';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthResponse, RefreshResponse } from 'src/auth/dto/auth.dto';
import { LoginRequest } from 'src/auth/dto/login.dto';
import { RegisterRequest } from 'src/auth/dto/register.dto';
import { AuthService } from './auth.service';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Регистрация нового пользователя',
    description:
      'Создает новую учетную запись пользователя с предоставленными данными.',
  })
  @ApiCreatedResponse({
    type: AuthResponse,
    description:
      'Пользователь успешно зарегистрирован. Возвращает данные пользователя и токен.',
  })
  @ApiBadRequestResponse({
    description:
      'Некорректные входные данные для регистрации (например, невалидный email или короткий пароль)',
  })
  @ApiConflictResponse({
    description: 'Пользователь с таким email уже существует',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterRequest,
  ) {
    return this.authService.register(res, dto);
  }

  @ApiOperation({
    summary: 'Вход в систему',
    description:
      'Аутентифицирует пользователя с использованием email и пароля. Устанавливает refresh token в HTTP-only куки.',
  })
  @ApiOkResponse({
    type: AuthResponse,
    description:
      'Пользователь успешно вошел в систему. Возвращает данные пользователя и токен.',
  })
  @ApiBadRequestResponse({
    description: 'Некорректные входные данные для входа',
  })
  @ApiUnauthorizedResponse({
    description: 'Неверный email или пароль',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginRequest,
  ) {
    return this.authService.login(res, dto);
  }

  @ApiOperation({
    summary: 'Обновление токенов',
    description:
      'Обновляет access token с использованием refresh token из куки.',
  })
  @ApiOkResponse({
    type: RefreshResponse,
    description: 'Access token успешно обновлен',
  })
  @ApiUnauthorizedResponse({
    description: 'Невалидный или истекший токен обновления (refresh token)',
  })
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refresh(res, req);
  }

  @ApiOperation({
    summary: 'Запрос сброса пароля',
    description:
      'Отправляет email с ссылкой для сброса пароля. Ссылка действительна 15 минут.',
  })
  @ApiOkResponse({
    description: 'Если аккаунт существует, письмо для сброса отправлено.',
  })
  @ApiBadRequestResponse({
    description: 'Некорректные входные данные',
  })
  @HttpCode(HttpStatus.OK)
  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @ApiOperation({
    summary: 'Сброс пароля по токену',
    description:
      'Устанавливает новый пароль с использованием токена из письма.',
  })
  @ApiOkResponse({
    description: 'Пароль успешно изменён.',
  })
  @ApiBadRequestResponse({
    description: 'Пароли не совпадают или некорректные данные',
  })
  @ApiUnauthorizedResponse({
    description: 'Токен невалиден или истёк',
  })
  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @ApiOperation({
    summary: 'Выход из системы',
    description: 'Удаляет сессию пользователя, очищая refresh token из куки.',
  })
  @ApiOkResponse({
    description: 'Выход из системы успешно выполнен. Куки очищены.',
  })
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
}
