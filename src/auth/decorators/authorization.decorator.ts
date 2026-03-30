import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/auth.guard';

export function Authorization() {
  return applyDecorators(UseGuards(JwtGuard), ApiBearerAuth());
}
