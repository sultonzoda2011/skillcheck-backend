import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginRequest {
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

  @ApiProperty({
    name: 'password',
    description: 'Пароль пользователя',
    example: 'SecurePassword123',
    minLength: 6,
    maxLength: 128,
  })
  @IsString({ message: 'Пароль должен быть строкой' })
  @IsNotEmpty({ message: 'Пароль обязателен для заполнения' })
  @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
  @MaxLength(128, { message: 'Пароль должен содержать максимум 128 символов' })
  password: string;
}
