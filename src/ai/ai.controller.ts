import { Controller } from '@nestjs/common';
import { AiService } from './ai.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AI - Базовое')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}
}
