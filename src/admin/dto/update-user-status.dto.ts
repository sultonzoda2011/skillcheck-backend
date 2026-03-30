import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsUUID } from 'class-validator';

export class UpdateUserStatusDto {
  @ApiProperty({
    description: 'ID пользователя',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description:
      'Заблокировать пользователя? true = заблокирован, false = разблокирован',
    example: true,
  })
  @IsBoolean()
  isBlocked: boolean;
}
