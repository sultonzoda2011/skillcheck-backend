import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { setupSwagger } from './utils/swagger.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  app.use(cookieParser());

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://skillcheck.kavsaracademy.tj',
      /\.vercel\.app$/,
    ],
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'Authorization'],
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());

  setupSwagger(app);

  await app.listen(process.env.PORT || 4000);
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
