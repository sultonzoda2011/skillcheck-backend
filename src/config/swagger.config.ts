import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('SkillCheck API')
    .setDescription(
      'Документация API для платформы проверки навыков SkillCheck. ' +
        'Здесь вы найдете все доступные эндпоинты для авторизации, управления профилем, просмотра результатов тестов и отзывов.',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .addSecurityRequirements('bearer');
}
