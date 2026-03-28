import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('SkillCheck API')
    .setDescription('API documentation for SkillCheck')
    .setVersion('1.0.0')
    .addBearerAuth();
}
