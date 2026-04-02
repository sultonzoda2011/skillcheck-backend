import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs/promises';
import * as path from 'path';
import { Prisma } from 'src/generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChangePasswordDto } from 'src/profile/dto/change-password.dto';
import { UpdateProfileDto } from 'src/profile/dto/update-profile.dto';
import {
  ALLOWED_MIME_TYPES,
  AVATARS_DIR,
  AVATARS_URL_PREFIX,
  resolveAvatarPath,
} from './constants/avatar.constants';
import { MulterFile, SafeUser, USER_SAFE_SELECT } from './types';

type UserUpdateInputWithMeta = Prisma.UserUpdateInput & {
  __oldAvatarPath?: string;
};

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
    const updateData: UserUpdateInputWithMeta = {};

    this.applyNameUpdate(dto, updateData);
    await this.applyAvatarUpdate(userId, file, updateData);

    const oldAvatarPath = updateData.__oldAvatarPath;
    delete updateData.__oldAvatarPath;

    const result = await this.saveUser(userId, updateData);

    if (oldAvatarPath) {
      await this.deleteOldAvatar(oldAvatarPath);
    }

    return result;
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const { newPassword, confirmPassword, oldPassword } = dto;

    if (!userId) {
      throw new BadRequestException('userId is required');
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid old password');
    }

    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prismaService.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }

  private applyNameUpdate(
    dto: UpdateProfileDto,
    updateData: Prisma.UserUpdateInput,
  ): void {
    if (dto.fullName) {
      updateData.fullName = dto.fullName;
    }
  }

  private async applyAvatarUpdate(
    userId: string,
    file: MulterFile | undefined,
    updateData: UserUpdateInputWithMeta,
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
      updateData.__oldAvatarPath = currentUser.profilePicture;
    }
  }

  private async deleteOldAvatar(profilePicturePath: string): Promise<void> {
    try {
      const absolutePath = resolveAvatarPath(profilePicturePath);
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

    return `${AVATARS_URL_PREFIX}/${fileName}`;
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
