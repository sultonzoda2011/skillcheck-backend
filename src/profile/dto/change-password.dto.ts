import { Match } from '@/auth/decorators/match.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches, IsNotEmpty } from 'class-validator';
export class ChangePasswordDto {
  @ApiProperty({ description: 'Текущий пароль' })
  @IsString()
  @IsNotEmpty({ message: 'Текущий пароль обязателен' })
  @Length(6, 100)
  oldPassword: string;

  @ApiProperty({ description: 'Новый пароль' })
  @IsString()
  @IsNotEmpty({ message: 'Новый пароль обязателен' })
  @Length(8, 100)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      'Новый пароль должен содержать минимум одну заглавную букву, одну строчную и одну цифру',
  })
  newPassword: string;

  @ApiProperty({ description: 'Подтверждение нового пароля' })
  @IsString()
  @IsNotEmpty({ message: 'Подтверждение пароля обязательно' })
  @Length(8, 100)
  @Match('newPassword', {
    message: 'Пароли не совпадают',
  })
  confirmPassword: string;
}
