import { Module } from '@nestjs/common';
import { QuizTopicsService } from './quiz-topics.service';
import { QuizTopicsController } from './quiz-topics.controller';

@Module({
  controllers: [QuizTopicsController],
  providers: [QuizTopicsService],
})
export class QuizTopicsModule {}
