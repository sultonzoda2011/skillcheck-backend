import { Controller, Get, Query } from '@nestjs/common';
import { RandomService } from './random.service';
import { GetRandomDto } from './dto/get-random.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { QuestionsResponseDto } from '../dto/questions-response.dto';

@ApiTags('AI - Случайные')
@Controller('/random/questions')
export class RandomController {
  constructor(private readonly randomService: RandomService) {}

  @Get()
  @ApiOperation({
    summary: 'Получить случайные вопросы',
    description:
      'Генерирует 10 уникальных случайных вопросов на основе выбранного типа и темы с помощью ИИ.',
  })
  @ApiOkResponse({
    type: QuestionsResponseDto,
    description: 'Список случайных вопросов успешно сгенерирован',
  })
  getQuestions(@Query() dto: GetRandomDto) {
    return this.randomService.getQuestions(dto);
  }
}
