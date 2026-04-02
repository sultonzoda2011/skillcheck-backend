import { GetMarathonDto } from '@/ai/marathon/dto/get-marathon.dto';
import { Controller, Get, Query } from '@nestjs/common';
import { MarathonService } from './marathon.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { QuestionsResponseDto } from '../dto/questions-response.dto';

@ApiTags('AI - Марафон')
@Controller('marathon/questions')
export class MarathonController {
  constructor(private readonly marathonService: MarathonService) {}

  @Get()
  @ApiOperation({
    summary: 'Получить вопросы для марафона',
    description:
      'Генерирует 10 уникальных вопросов на основе выбранного типа, темы и сложности с помощью ИИ.',
  })
  @ApiOkResponse({
    type: QuestionsResponseDto,
    description: 'Список вопросов успешно сгенерирован',
  })
  getQuestions(@Query() dto: GetMarathonDto) {
    return this.marathonService.getQuestions(dto);
  }
}
