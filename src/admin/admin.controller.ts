import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UpdateUserStatusDto } from 'src/admin/dto/update-user-status.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin')
@Roles('ADMIN')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Get('users')
  @ApiOperation({ summary: 'Получить список всех пользователей' })
  async getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Post('user/status')
  @ApiOperation({
    summary: 'Заблокировать или разблокировать пользователя',
    description: 'isBlocked: true — заблокировать, false — разблокировать',
  })
  @ApiOkResponse({ description: 'Статус пользователя обновлён' })
  @ApiBadRequestResponse({ description: 'Ошибка при обновлении статуса' })
  async updateUserStatus(@Body() dto: UpdateUserStatusDto) {
    return this.adminService.updateUserStatus(dto);
  }
}
