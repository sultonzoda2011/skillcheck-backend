import { Injectable } from '@nestjs/common';
import { UpdateUserStatusDto } from 'src/admin/dto/update-user-status.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { USER_SAFE_SELECT } from 'src/profile/types';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUsers() {
    return this.prismaService.user.findMany({
      where: { role: 'USER' },
      select: USER_SAFE_SELECT,
    });
  }
  async updateUserStatus(dto: UpdateUserStatusDto) {
    const { userId, isBlocked } = dto;
    return this.prismaService.user.update({
      where: { id: userId },
      data: { isBlocked },
      select: USER_SAFE_SELECT,
    });
  }
}
