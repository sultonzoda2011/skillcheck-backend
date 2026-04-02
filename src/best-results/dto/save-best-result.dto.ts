import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, Min } from 'class-validator';

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
    minimum: 1,
  })
  @IsInt({ message: 'Score должен быть целым числом' })
  @Min(1, { message: 'Score должен быть положительным числом' })
  score: number;
}
