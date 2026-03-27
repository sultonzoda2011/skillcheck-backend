import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterRequest {
  @IsString({ message: 'FullName must be a string' })
  @IsNotEmpty({ message: 'FullName is required' })
  @MaxLength(50, { message: 'FullName must be at most 50 characters' })
  fullName: string;
  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Email  is required' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password  is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(128, { message: 'Password must be at most 128 characters' })
  password: string;
}

export class LoginRequest {
  @IsString({ message: 'Email must be a string' })
  @IsNotEmpty({ message: 'Email  is required' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password  is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(128, { message: 'Password must be at most 128 characters' })
  password: string;
}