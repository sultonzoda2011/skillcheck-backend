import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards();
  const config = new DocumentBuilder()
    .setTitle('SkillCheck  API')
    .setDescription('API documentation for SkillCheck')
    .setVersion('1.0.0')
    .setContact(
      'Sultonzoda Abdulloh',
      'https://skillcheck.kavsaracademy.tj',
      'sultonzoda2011@gmail.com',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config, {});
  SwaggerModule.setup('api-docs', app, document, {
    jsonDocumentUrl: '/swagger/json',
    yamlDocumentUrl: '/swagger/yaml',
    customSiteTitle: 'SkillCheck API Documentation',
  });
  await app.listen(4000);
}
bootstrap();
