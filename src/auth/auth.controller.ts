import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import type { Request, Response } from 'express';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { AuthResponse } from 'src/auth/dto/auth.dto';
import { LoginRequest } from 'src/auth/dto/login.dto';
import { RegisterRequest } from 'src/auth/dto/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({
    summary: 'Register a new user',
    description: 'Creates a new user account with the provided details.',
  })
  @ApiOkResponse({
    type: AuthResponse,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data for registration',
  })
  @ApiConflictResponse({
    description: 'User with this email already exists',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterRequest,
  ) {
    return this.authService.register(res, dto);
  }
  @ApiOperation({
    summary: 'Login a user',
    description: 'Authenticates a user with the provided email and password.',
  })
  @ApiOkResponse({
    type: AuthResponse,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data for login',
  })
  @ApiConflictResponse({
    description: 'User with this email already exists',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginRequest,
  ) {
    return this.authService.login(res, dto);
  }
  @ApiOperation({
    summary: 'Refresh a user',
    description: 'Refreshes the access token for a user.',
  })
  @ApiOkResponse({
    type: AuthResponse,
  })
  @ApiUnauthorizedResponse({
    description: ' Invalid or expired refresh token',
  })
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refresh(res, req);
  }
  @ApiOperation({
    summary: 'Logout a user',
    description: 'Logs out a user by clearing the refresh token.',
  })
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
  @Authorization()
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  profile(@Authorized() user: User) {
    return user;
  }
}
