import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequest, RegisterRequest } from 'src/auth/dto/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @Post('register')
  async register(@Body() dto: RegisterRequest) {
    return this.authService.register(dto);
  }
  @Post('login')
  async login(@Body() dto: LoginRequest) {
    return this.authService.login(dto);
  }
}
