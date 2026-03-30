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
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from 'src/generated/prisma/browser';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { UpdateProfileDto } from 'src/profile/dto/update-profile.dto';
import { ProfileService } from './profile.service';
import { ChangePasswordDto } from 'src/profile/dto/change-password.dto';
import { UserDto } from './dto/user.dto';

@ApiTags('Профиль')
@Authorization()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({
    summary: 'Получить профиль текущего пользователя',
    description:
      'Возвращает полную информацию о профиле авторизованного пользователя, включая лучшие результаты тестов.',
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
    summary: 'Обновить данные профиля',
    description:
      'Позволяет изменить имя, email и загрузить новую аватарку. Использует multipart/form-data.',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('profilePicture'))
  @ApiBody({
    type: UpdateProfileDto,
    description: 'Данные для обновления профиля и файл аватарки',
  })
  @ApiOkResponse({
    type: UserDto,
    description: 'Профиль успешно обновлён',
  })
  @ApiBadRequestResponse({
    description: 'Некорректные данные или неподдерживаемый формат файла',
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
    summary: 'Сменить пароль',
    description:
      'Позволяет пользователю изменить текущий пароль на новый. Требует подтверждения старого пароля.',
  })
  @ApiOkResponse({
    description: 'Пароль успешно изменён',
  })
  @ApiBadRequestResponse({
    description:
      'Неверный текущий пароль, новый пароль не соответствует требованиям или пароли не совпадают',
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
