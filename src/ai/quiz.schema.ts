import { z } from 'zod';

export const QuestionSchema = z.object({
  question: z.string(),
  answers: z.array(z.string()).length(4),
  correctIndex: z.number().int().min(0).max(3),
  difficulty: z.string(),
  code: z.string().optional().nullable(),
  codeLanguage: z.string().optional().nullable(),
});

export const QuestionsSchema = z.object({
  questions: z.array(QuestionSchema).length(10),
});

export type Question = z.infer<typeof QuestionSchema>;
export type Questions = z.infer<typeof QuestionsSchema>;
