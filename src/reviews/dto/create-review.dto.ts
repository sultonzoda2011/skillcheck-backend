import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Текст отзыва о платформе',
    example:
      'Попробовал SkillCheck — реально свежий формат подготовки к собеседованиям. За счёт Google Gemini вопросы каждый раз новые...',
    minLength: 10,
    maxLength: 1000,
  })
  @IsString()
  @IsNotEmpty({ message: 'Текст отзыва обязателен' })
  @MinLength(10, { message: 'Текст должен содержать минимум 10 символов' })
  @MaxLength(1000, { message: 'Текст не должен превышать 1000 символов' })
  text: string;

  @ApiProperty({
    description: 'Рейтинг платформы от 1 до 5 звезд',
    example: 5,
    minimum: 1,
    maximum: 5,
    default: 5,
  })
  @IsInt({ message: 'Рейтинг должен быть целым числом' })
  @Min(1, { message: 'Рейтинг не может быть меньше 1' })
  @Max(5, { message: 'Рейтинг не может быть больше 5' })
  rating: number = 5;
}
