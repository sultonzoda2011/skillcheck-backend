import { AiService } from '@/ai/ai.service';
import { Questions } from '@/ai/quiz.schema';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
export interface RandomParams {
  type: string;
  topic: string;
  lang: string;
}
const difficulties = ['easy', 'medium', 'hard', 'very-hard', 'expert'];

@Injectable()
export class RandomService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly aiService: AiService,
  ) {}
  async getQuestions(params: RandomParams): Promise<Questions> {
    const { type, topic, lang } = params;
    const randomDifficulty =
      difficulties[Math.floor(Math.random() * difficulties.length)];

    const quizTopic = await this.prismaService.quizTopic.findFirst({
      where: {
        topic,
        type,
        difficulty: randomDifficulty,
      },
    });
    if (!quizTopic) {
      throw new NotFoundException(`Topic not found: ${type}/${topic}`);
    }
    const prompt = this.aiService.buildPrompt(
      quizTopic.description,
      quizTopic.codeLanguages,
      randomDifficulty,
      lang,
    );

    return this.aiService.generateQuestions(prompt);
  }
}
