import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T = any> {
  @ApiProperty({ example: 'Операция успешна' })
  message: string;

  @ApiProperty({ example: null })
  data: T | [];

  @ApiProperty({ example: 200 })
  status: number;

  constructor(message: string, data: T | [] = [], status: number = 200) {
    this.message = message;
    this.data = data ?? [];
    this.status = status;
  }
}
