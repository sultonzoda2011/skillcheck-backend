import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class GetRandomDto {
  @ApiProperty({
    description: 'Тип теста (например, frontend, backend)',
    example: 'frontend',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description: 'Тема теста (например, react, nestjs)',
    example: 'react',
  })
  @IsString()
  @IsNotEmpty()
  topic: string;

  @ApiProperty({
    description: 'Язык вопросов (ru или en)',
    example: 'ru',
    default: 'en',
    required: false,
  })
  @IsOptional()
  @IsString()
  lang: string = 'en';
}
