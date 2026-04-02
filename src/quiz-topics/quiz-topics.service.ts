import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class QuizTopicsService {
  constructor(private readonly prismaService: PrismaService) {}
  async getTypes() {
    const result = await this.prismaService.quizTopic.findMany({
      select: { type: true },
      distinct: ['type'],
      orderBy: { type: 'asc' },
    });
    return result.map((t) => t.type);
  }
  async getTopics(type: string) {
    const result = await this.prismaService.quizTopic.findMany({
      where: { type },
      distinct: ['topic'],
      select: { topic: true },
      orderBy: { topic: 'asc' },
    });
    return result.map((t) => t.topic);
  }
  async getDifficulties(type: string, topic: string) {
    const result = await this.prismaService.quizTopic.findMany({
      where: { type, topic },
      distinct: ['difficulty'],
      select: { difficulty: true },
      orderBy: { difficulty: 'asc' },
    });
    return result.map((t) => t.difficulty);
  }
}
