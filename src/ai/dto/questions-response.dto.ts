import { ApiProperty } from '@nestjs/swagger';

export class QuestionDto {
  @ApiProperty({
    description: 'Текст вопроса',
    example: 'Что такое React?',
  })
  question: string;

  @ApiProperty({
    description: 'Список вариантов ответов (необходимо ровно 4)',
    example: ['Библиотека', 'Фреймворк', 'Язык', 'БД'],
    isArray: true,
  })
  answers: string[];

  @ApiProperty({
    description: 'Индекс правильного ответа (0-3)',
    example: 0,
  })
  correctIndex: number;

  @ApiProperty({
    description: 'Сложность вопроса',
    example: 'junior',
  })
  difficulty: string;

  @ApiProperty({
    description: 'Пример кода (если есть)',
    example: "console.log('hello')",
    required: false,
    nullable: true,
  })
  code?: string | null;

  @ApiProperty({
    description: 'Язык программирования для кода',
    example: 'javascript',
    required: false,
    nullable: true,
  })
  codeLanguage?: string | null;
}

export class QuestionsResponseDto {
  @ApiProperty({
    description: 'Список сгенерированных вопросов',
    type: [QuestionDto],
  })
  questions: QuestionDto[];
}
