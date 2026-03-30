import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class UpdateProfileDto {
  @ApiPropertyOptional({
    name: 'fullName',
    description: 'Новое полное имя пользователя',
    example: 'Александр Сергеевич Пушкин',
  })
  @IsOptional()
  @IsString()
  @Length(2, 100)
  fullName?: string;

  @ApiPropertyOptional({
    name: 'email',
    description: 'Новый email адрес пользователя',
    example: 'new.email@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
    description: 'Файл аватарки пользователя (jpg, png, webp)',
  })
  @IsOptional()
  profilePicture?: any;
}
