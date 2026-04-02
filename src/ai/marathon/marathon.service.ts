import { AiService } from '@/ai/ai.service';
import { Questions } from '@/ai/quiz.schema';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
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
