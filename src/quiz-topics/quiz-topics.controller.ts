import { QuizTopicsService } from '@/quiz-topics/quiz-topics.service';
import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Темы тестов')
@Controller('quiz-topics')
export class QuizTopicsController {
  constructor(private readonly service: QuizTopicsService) {}

  @ApiOperation({
    summary: 'Получить типы тестов',
    description:
      'Возвращает список всех доступных типов тестов (например: frontend, backend).',
  })
  @ApiOkResponse({
    description: 'Список типов тестов успешно получен',
    type: [String],
  })
  @Get('types')
  getTypes() {
    return this.service.getTypes();
  }

  @ApiOperation({
    summary: 'Получить темы по типу',
    description:
      'Возвращает список всех доступных тем для указанного типа теста.',
  })
  @ApiQuery({
    name: 'type',
    description: 'Тип теста (например: frontend, backend)',
    example: 'frontend',
  })
  @ApiOkResponse({
    description: 'Список тем успешно получен',
    type: [String],
  })
  @Get('topics')
  getTopics(@Query('type') type: string) {
    return this.service.getTopics(type);
  }

  @ApiOperation({
    summary: 'Получить уровни сложности',
    description:
      'Возвращает список всех доступных уровней сложности для указанного типа и темы теста.',
  })
  @ApiQuery({
    name: 'type',
    description: 'Тип теста (например: frontend, backend)',
    example: 'frontend',
  })
  @ApiQuery({
    name: 'topic',
    description: 'Тема теста',
    example: 'JavaScript',
  })
  @ApiOkResponse({
    description: 'Список уровней сложности успешно получен',
    type: [String],
  })
  @Get('difficulties')
  getDifficulties(@Query('type') type: string, @Query('topic') topic: string) {
    return this.service.getDifficulties(type, topic);
  }
}
