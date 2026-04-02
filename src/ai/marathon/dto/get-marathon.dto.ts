import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class GetMarathonDto {
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
    description: 'Уровень сложности (например, junior, middle, senior)',
    example: 'junior',
  })
  @IsString()
  @IsNotEmpty()
  difficulty: string;

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
