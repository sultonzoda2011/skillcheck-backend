import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AiService } from '../ai.service';
import { type Questions } from '../quiz.schema';
export interface MarathonParams {
  type: string;
  topic: string;
  difficulty: string;
  lang: string;
}
@Injectable()
export class MarathonService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly aiService: AiService,
  ) {}
  async getQuestions(params: MarathonParams): Promise<Questions> {
    const { difficulty, lang, topic, type } = params;
    const quizTopic = await this.prismaService.quizTopic.findFirst({
      where: {
        topic,
        type,
        difficulty,
      },
    });
    if (!quizTopic) {
      throw new NotFoundException(
        `Topic not found: ${type}/${topic}/${difficulty}`,
      );
    }
    const prompt = this.aiService.buildPrompt(
      quizTopic.description,
      quizTopic.codeLanguages,
      difficulty,
      lang,
    );
    return this.aiService.generateQuestions(prompt);
  }
}
