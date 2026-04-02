import { Injectable } from '@nestjs/common';
import { UpdateUserStatusDto } from 'src/admin/dto/update-user-status.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ADMIN_USER_SELECT } from 'src/profile/types';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUsers() {
    return this.prismaService.user.findMany({
      where: { role: 'USER' },
      select: ADMIN_USER_SELECT,
    });
  }
  async updateUserStatus(dto: UpdateUserStatusDto) {
    const { userId, isBlocked } = dto;
    return this.prismaService.user.update({
      where: { id: userId },
      data: { isBlocked },
      select: ADMIN_USER_SELECT,
    });
  }
}
