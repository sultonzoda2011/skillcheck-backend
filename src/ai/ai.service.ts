import { GoogleGenAI } from '@google/genai';
import { Injectable } from '@nestjs/common';
import { QuestionsSchema, type Questions } from './quiz.schema';

@Injectable()
export class AiService {
  private readonly genai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  async generateQuestions(prompt: string): Promise<Questions> {
    const response = await this.genai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'object',
          properties: {
            questions: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  question: { type: 'string' },
                  answers: { type: 'array', items: { type: 'string' } },
                  correctIndex: { type: 'integer' },
                  difficulty: { type: 'string' },
                  code: { type: 'string', nullable: true },
                  codeLanguage: { type: 'string', nullable: true },
                },
                required: ['question', 'answers', 'correctIndex', 'difficulty'],
              },
            },
          },
          required: ['questions'],
        },
      },
    });

    const parsed = QuestionsSchema.parse(JSON.parse(response.text!));
    return parsed;
  }
  buildPrompt(
    description: string,
    codeLanguages: string[],
    difficulty: string,
    lang: string,
  ): string {
    return `
You are an expert technical assessor and professional quiz generator for developers.

Generate exactly 10 multiple-choice questions about: ${description}

Requirements:
- Difficulty level: ${difficulty}
- Language for questions and answers: ${lang === 'ru' ? 'Russian' : 'English'}
- Each question must have exactly 4 answer options.
- Only one answer is correct.
- CRITICAL: Randomize the position of the correct answer! The 'correctIndex' (0, 1, 2, or 3) MUST vary randomly and evenly across all 10 questions. Do not repeatedly place the correct answer at index 0 or 1.
- Questions must be practical and test real-world knowledge, not just trivia.
- Distractors (incorrect options) must be highly plausible and reflect common developer mistakes or misconceptions.
- Vary question types: conceptual understanding, code output prediction, best practices, and debugging.

Code requirements:
- Include a 'code' snippet ONLY if it is essential for understanding the question.
- If code is included, use one of these languages: ${codeLanguages.join(', ')}.
- If no code is needed, explicitly set 'code' and 'codeLanguage' to null.

Output Format:
Return ONLY a valid, minified JSON object matching the exact structure below. Do not include markdown code blocks (\`\`\`json), greetings, or explanations.

{
  "questions": [
    {
      "question": "Clear and concise question text",
      "answers": ["Plausible incorrect option", "Plausible incorrect option", "Correct option", "Plausible incorrect option"],
      "correctIndex": 2,
      "difficulty": "${difficulty}",
      "code": "console.log('example');",
      "codeLanguage": "javascript"
    }
  ]
}
  `.trim();
  }
}
