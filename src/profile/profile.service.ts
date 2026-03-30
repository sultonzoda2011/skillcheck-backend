import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { Prisma } from 'src/generated/prisma/browser';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangePasswordDto } from 'src/profile/dto/change-password.dto';
import { UpdateProfileDto } from 'src/profile/dto/update-profile.dto';
import { ALLOWED_MIME_TYPES, AVATARS_DIR } from './constants/avatar.constants';
import { MulterFile, SafeUser, USER_SAFE_SELECT } from './types';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserById(userId: string) {
    if (!userId) {
      throw new BadRequestException('userId is required');
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: { bestResult: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { ...user, password: undefined };
  }

  async updateProfile(
    userId: string,
    dto: UpdateProfileDto,
    file?: MulterFile,
  ): Promise<SafeUser> {
    const updateData: Prisma.UserUpdateInput = {};

    this.applyNameUpdate(dto, updateData);
    await this.applyEmailUpdate(userId, dto, updateData);
    await this.applyAvatarUpdate(userId, file, updateData);

    return this.saveUser(userId, updateData);
  }
  async changePassword(userId: string, dto: ChangePasswordDto) {
    const { newPassword, confirmPassword, oldPassword } = dto;
    const user = this.getUserById(userId);
    if (
      (await user).password == oldPassword &&
      oldPassword === confirmPassword
    ) {
      return this.prismaService.user.update({
        where: { id: userId },
        data: { password: newPassword },
      });
    }
  }

  private applyNameUpdate(
    dto: UpdateProfileDto,
    updateData: Prisma.UserUpdateInput,
  ): void {
    if (dto.fullName) {
      updateData.fullName = dto.fullName;
    }
  }

  private async applyEmailUpdate(
    userId: string,
    dto: UpdateProfileDto,
    updateData: Prisma.UserUpdateInput,
  ): Promise<void> {
    if (!dto.email) return;

    await this.assertEmailNotTaken(userId, dto.email);
    updateData.email = dto.email;
  }

  private async applyAvatarUpdate(
    userId: string,
    file: MulterFile | undefined,
    updateData: Prisma.UserUpdateInput,
  ): Promise<void> {
    if (!file) return;

    this.validateMimeType(file.mimetype);

    const currentUser = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: { profilePicture: true },
    });

    const avatarPath = await this.saveAvatarFile(userId, file);
    updateData.profilePicture = avatarPath;

    if (currentUser?.profilePicture) {
      await this.deleteOldAvatar(currentUser.profilePicture);
    }
  }

  private async deleteOldAvatar(profilePicturePath: string): Promise<void> {
    try {
      const absolutePath = path.join(process.cwd(), profilePicturePath);
      await fs.unlink(absolutePath);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        console.warn(
          `Failed to delete old avatar: ${profilePicturePath}`,
          error,
        );
      }
    }
  }
  private async assertEmailNotTaken(
    userId: string,
    email: string,
  ): Promise<void> {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (existingUser && existingUser.id !== userId) {
      throw new BadRequestException(
        'Этот email уже используется другим пользователем',
      );
    }
  }

  private validateMimeType(mimetype: string): void {
    if (
      !ALLOWED_MIME_TYPES.includes(
        mimetype as (typeof ALLOWED_MIME_TYPES)[number],
      )
    ) {
      throw new BadRequestException(
        'Разрешены только изображения: jpg, png, webp',
      );
    }
  }

  private async saveAvatarFile(
    userId: string,
    file: MulterFile,
  ): Promise<string> {
    await fs.mkdir(AVATARS_DIR, { recursive: true });

    const ext = path.extname(file.originalname);
    const fileName = `${userId}-${Date.now()}${ext}`;
    const filePath = path.join(AVATARS_DIR, fileName);

    await fs.writeFile(filePath, file.buffer);

    return `/uploads/avatars/${fileName}`;
  }

  private async saveUser(
    userId: string,
    updateData: Prisma.UserUpdateInput,
  ): Promise<SafeUser> {
    return this.prismaService.user.update({
      where: { id: userId },
      data: updateData,
      select: USER_SAFE_SELECT,
    }) as unknown as Promise<SafeUser>;
  }
}
