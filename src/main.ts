import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import { setupSwagger } from 'src/utils/swagger.util';
import { AppModule } from './app.module';
// eslint-disable-next-line @typescript-eslint/no-require-imports
import cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalGuards();
  setupSwagger(app);
  await app.listen(4000);
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
