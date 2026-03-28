import type { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { getSwaggerConfig } from 'src/config/swagger.config';

export function setupSwagger(app: INestApplication) {
  const config = getSwaggerConfig()
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
  });
}
