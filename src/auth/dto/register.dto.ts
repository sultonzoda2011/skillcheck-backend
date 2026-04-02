import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RegisterRequest {
  @ApiProperty({
    name: 'fullName',
    description: 'Полное имя пользователя',
    example: 'Иван Иванов',
    maxLength: 50,
  })
  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя обязательно для заполнения' })
  @MaxLength(50, { message: 'Имя должно содержать максимум 50 символов' })
  fullName: string;

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
