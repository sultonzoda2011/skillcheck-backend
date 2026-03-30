import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Authorization } from 'src/auth/decorators/authorization.decorator';
import { Authorized } from 'src/auth/decorators/authorized.decorator';
import { SaveBestResultDto } from 'src/best-results/dto/save-best-result.dto';
import { User } from 'src/generated/prisma/browser';
import { BestResultsService } from './best-results.service';

@Controller('best-results')
export class BestResultsController {
  constructor(private readonly bestResultsService: BestResultsService) {}
  @Get('my-best')
  @Authorization()
  @ApiOperation({ summary: 'Получить лучшие результаты текущего пользователя' })
  @ApiOkResponse({
    description: 'Возвращает текущие лучшие результаты по всем типам тестов',
  })
  @ApiUnauthorizedResponse({ description: 'Пользователь не авторизован' })
  async getMyBest(@Authorized() user: User) {
    return this.bestResultsService.getBestResults(user.id);
  }
  @Post('my-best')
  @Authorization()
  @ApiOperation({
    summary: 'Сохранить или обновить лучший результат',
    description:
      'Если новый score лучше — обновляет результат и дату. Если равен — обновляет только дату достижения.',
  })
  @ApiOkResponse({ description: 'Результат успешно сохранён/обновлён' })
  @ApiBadRequestResponse({ description: 'Некорректные данные' })
  async saveBestResult(
    @Authorized() user: User,
    @Body() dto: SaveBestResultDto,
  ) {
    return this.bestResultsService.saveBestResult(user.id, dto);
  }
  @Get('leaderboard')
  @ApiOperation({
    summary: 'Глобальный лидерборд — топ 15',
    description: 'Топ-15 по лучшему Frontend score. Публичный роут.',
  })
  @ApiOkResponse({ description: 'Возвращает топ-15 пользователей' })
  async getLeaderboard() {
    return this.bestResultsService.getLeaderboard();
  }
  @Get('leaderboard-5')
  @ApiOperation({
    summary: 'Глобальный лидерборд — топ 5',
    description: 'Топ-5 по лучшему Frontend score. Публичный роут.',
  })
  @ApiOkResponse({ description: 'Возвращает топ-5 пользователей' })
  async getLeaderboard5() {
    return this.bestResultsService.getLeaderboard5();
  }
}
