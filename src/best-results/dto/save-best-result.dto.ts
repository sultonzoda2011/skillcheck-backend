import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsPositive, Min } from 'class-validator';

export enum TestType {
  FRONTEND = 'frontend',
  BACKEND = 'backend',
  MOBILE = 'mobile',
}

export class SaveBestResultDto {
  @ApiProperty({
    description: 'Тип теста, для которого сохраняется результат',
    enum: TestType,
    example: 'frontend',
  })
  @IsEnum(TestType, {
    message: 'Тип теста должен быть frontend, backend или mobile',
  })
  type: TestType;

  @ApiProperty({
    description: 'Набранный балл в тесте',
    example: 1250,
    minimum: 0,
  })
  @IsInt({ message: 'Score должен быть целым числом' })
  @IsPositive({ message: 'Score должен быть положительным числом' })
  @Min(0, { message: 'Score не может быть отрицательным' })
  score: number;
}
