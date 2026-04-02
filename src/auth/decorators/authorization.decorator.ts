import { JwtGuard } from '@/auth/guards/auth.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

export function Authorization() {
  return applyDecorators(UseGuards(JwtGuard), ApiBearerAuth());
}
