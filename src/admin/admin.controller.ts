import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateUserStatusDto } from 'src/admin/dto/update-user-status.dto';
import { JwtGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';
import { AdminService } from './admin.service';

@ApiTags('Администрирование')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Controller('admin')
@Roles('ADMIN')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  @ApiOperation({
    summary: 'Получить список всех пользователей',
    description:
      'Возвращает полную информацию обо всех зарегистрированных пользователях в системе. Доступно только администраторам.',
  })
  @ApiOkResponse({
    description: 'Список пользователей успешно получен',
  })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiForbiddenResponse({
    description: 'Недостаточно прав (требуется роль ADMIN)',
  })
  async getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Post('user/status')
  @ApiOperation({
    summary: 'Изменить статус блокировки пользователя',
    description:
      'Позволяет заблокировать или разблокировать доступ пользователя к системе. Доступно только администраторам.',
  })
  @ApiOkResponse({ description: 'Статус пользователя успешно обновлён' })
  @ApiBadRequestResponse({ description: 'Некорректные данные в запросе' })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  @ApiForbiddenResponse({
    description: 'Недостаточно прав (требуется роль ADMIN)',
  })
  async updateUserStatus(@Body() dto: UpdateUserStatusDto) {
    return this.adminService.updateUserStatus(dto);
  }
}
