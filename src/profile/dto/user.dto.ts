import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BestResultDto {
  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' })
  id: string;

  @ApiProperty({ description: 'Лучший результат во фронтенд тесте', example: 85 })
  bestFrontendScore: number;

  @ApiProperty({ description: 'Лучший результат в бэкенд тесте', example: 90 })
  bestBackendScore: number;

  @ApiProperty({ description: 'Лучший результат в мобильном тесте', example: 75 })
  bestMobileScore: number;

  @ApiPropertyOptional({ description: 'Дата достижения результата во фронтенде', example: '2024-03-29T12:00:00Z' })
  frontendAchievedAt?: Date;

  @ApiPropertyOptional({ description: 'Дата достижения результата в бэкенде', example: '2024-03-29T12:00:00Z' })
  backendAchievedAt?: Date;

  @ApiPropertyOptional({ description: 'Дата достижения результата в мобильной разработке', example: '2024-03-29T12:00:00Z' })
  mobileAchievedAt?: Date;
}

export class UserDto {
  @ApiProperty({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' })
  id: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiPropertyOptional({ example: 'Иван Иванов', nullable: true })
  fullName: string | null;

  @ApiPropertyOptional({ example: '/uploads/avatars/avatar.jpg', nullable: true })
  profilePicture: string | null;

  @ApiProperty({ example: '2024-03-29T12:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-03-29T12:00:00Z' })
  updatedAt: Date;

  @ApiPropertyOptional({ type: BestResultDto, nullable: true })
  bestResult?: BestResultDto | null;
}
