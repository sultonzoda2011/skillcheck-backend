import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterRequest {
  @ApiProperty({
    name: 'fullName',
    description: 'Full name of the user',
    example: 'John Doe',
    maxLength: 50,
  })
  @IsString({ message: 'FullName must be a string' })
  @IsNotEmpty({ message: 'FullName is required' })
  @MaxLength(50, { message: 'FullName must be at most 50 characters' })
  fullName: string;
  @ApiProperty({
    name: 'email',
    description: 'Email address of the user',
    example: 'john.doe@example.com',
    maxLength: 255,
  })
  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Email  is required' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;
  @ApiProperty({
    name: 'password',
    description: 'Password of the user',
    example: 'SecurePassword123',
    minLength: 6,
    maxLength: 128,
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password  is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(128, { message: 'Password must be at most 128 characters' })
  password: string;
}
