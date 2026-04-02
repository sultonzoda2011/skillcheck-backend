import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { SaveBestResultDto } from 'src/best-results/dto/save-best-result.dto';
import { User } from '@prisma/client';
import { BestResultsService } from './best-results.service';

@ApiTags('Результаты тестов')
@Controller('best-results')
export class BestResultsController {
  constructor(private readonly bestResultsService: BestResultsService) {}

  @Get('my-best')
  @ApiBearerAuth()
  @Authorization()
  @ApiOperation({
    summary: 'Получить лучшие результаты текущего пользователя',
    description:
      'Возвращает список лучших результатов пользователя по всем категориям тестов (Frontend, Backend, Mobile).',
  })
  @ApiOkResponse({
    description: 'Лучшие результаты пользователя успешно получены',
  })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  async getMyBest(@Authorized() user: User) {
    return this.bestResultsService.getBestResults(user.id);
  }

  @Post('my-best')
  @ApiBearerAuth()
  @Authorization()
  @ApiOperation({
    summary: 'Сохранить или обновить лучший результат',
    description:
      'Обновляет рекорд пользователя в определенной категории. Если новый результат выше текущего — он сохраняется как лучший. Обновляется также дата достижения рекорда.',
  })
  @ApiOkResponse({ description: 'Результат успешно сохранён или обновлён' })
  @ApiBadRequestResponse({
    description:
      'Некорректные данные (неверный тип теста или отрицательный балл)',
  })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  async saveBestResult(
    @Authorized() user: User,
    @Body() dto: SaveBestResultDto,
  ) {
    return this.bestResultsService.saveBestResult(user.id, dto);
  }

  @Get('leaderboard')
  @ApiOperation({
    summary: 'Получить полный лидерборд (Топ-15)',
    description:
      'Возвращает 15 лучших пользователей по их самому высокому баллу. Публичный доступ.',
  })
  @ApiOkResponse({
    description: 'Список 15 лучших пользователей успешно получен',
  })
  async getLeaderboard() {
    return this.bestResultsService.getLeaderboard();
  }

  @Get('leaderboard-5')
  @ApiOperation({
    summary: 'Получить краткий лидерборд (Топ-5)',
    description:
      'Возвращает 5 лучших пользователей. Используется для виджетов на главной странице. Публичный доступ.',
  })
  @ApiOkResponse({
    description: 'Список 5 лучших пользователей успешно получен',
  })
  async getLeaderboard5() {
    return this.bestResultsService.getLeaderboard5();
  }
}
