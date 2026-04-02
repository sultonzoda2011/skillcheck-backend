import { Match } from '@/auth/decorators/match.decorator';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    name: 'email',
    description: 'Email адрес пользователя',
    example: 'john.doe@example.com',
    maxLength: 255,
  })
  @IsString({ message: 'Email должен быть строкой' })
  @IsNotEmpty({ message: 'Email обязателен для заполнения' })
  @IsEmail(
    {},
    { message: 'Email должен быть валидным адресом электронной почты' },
  )
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({
    name: 'token',
    description: 'Токен сброса пароля из письма',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString({ message: 'Токен должен быть строкой' })
  @IsNotEmpty({ message: 'Токен обязателен для заполнения' })
  token: string;

  @ApiProperty({
    name: 'newPassword',
    description: 'Новый пароль пользователя',
    example: 'NewPassword123',
    minLength: 6,
    maxLength: 128,
  })
  @IsString({ message: 'Новый пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Новый пароль обязателен для заполнения' })
  @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
  @MaxLength(128, { message: 'Пароль должен содержать максимум 128 символов' })
  newPassword: string;

  @ApiProperty({
    name: 'confirmPassword',
    description: 'Подтверждение нового пароля пользователя',
    example: 'NewPassword123',
    minLength: 6,
    maxLength: 128,
  })
  @IsString({ message: 'Подтверждение пароля должно быть строкой' })
  @IsNotEmpty({ message: 'Подтверждение пароля обязательно для заполнения' })
  @Match('newPassword', { message: 'Пароли не совпадают' })
  confirmPassword: string;
}
