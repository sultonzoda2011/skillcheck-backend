import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from 'src/generated/prisma';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { UpdateProfileDto } from 'src/profile/dto/update-profile.dto';
import { ProfileService } from './profile.service';
import { ChangePasswordDto } from 'src/profile/dto/change-password.dto';
import { UserDto } from './dto/user.dto';

@ApiTags('Профиль')
@ApiBearerAuth()
@Authorization()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({
    summary: 'Получить данные текущего пользователя',
    description:
      'Возвращает подробную информацию о профиле авторизованного пользователя, включая его персональные данные и лучшие результаты тестов.',
  })
  @ApiOkResponse({
    type: UserDto,
    description: 'Данные профиля успешно получены',
  })
  @ApiUnauthorizedResponse({
    description: 'Пользователь не авторизован или сессия истекла',
  })
  @HttpCode(HttpStatus.OK)
  @Get('')
  async profile(@Authorized() user: User) {
    return this.profileService.getUserById(user.id);
  }

  @Patch()
  @ApiOperation({
    summary: 'Обновить информацию профиля',
    description:
      'Позволяет изменить имя пользователя, его email (если не занят) и загрузить новую аватарку. Использует multipart/form-data для поддержки загрузки файлов.',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('profilePicture'))
  @ApiBody({
    type: UpdateProfileDto,
    description: 'Объект с данными для обновления и файл изображения',
  })
  @ApiOkResponse({
    type: UserDto,
    description:
      'Профиль успешно обновлён. Возвращает актуальные данные пользователя.',
  })
  @ApiBadRequestResponse({
    description: 'Некорректные данные или неподдерживаемый формат изображения',
  })
  @ApiUnauthorizedResponse({
    description: 'Пользователь не авторизован',
  })
  async updateProfile(
    @Authorized() currentUser: User,
    @Body() updateProfileDto: UpdateProfileDto,
    @UploadedFile() profilePicture?: Express.Multer.File,
  ) {
    return this.profileService.updateProfile(
      currentUser.id,
      updateProfileDto,
      profilePicture,
    );
  }

  @Post('change-password')
  @ApiOperation({
    summary: 'Смена пароля',
    description:
      'Безопасное изменение текущего пароля пользователя. Требует ввода старого пароля и подтверждения нового.',
  })
  @ApiOkResponse({
    description: 'Пароль успешно изменён',
  })
  @ApiBadRequestResponse({
    description:
      'Старый пароль введен неверно или новый пароль не соответствует требованиям безопасности',
  })
  @ApiUnauthorizedResponse({
    description: 'Пользователь не авторизован',
  })
  async changePassword(
    @Authorized() user: User,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.profileService.changePassword(user.id, dto);
  }
}
