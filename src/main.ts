import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { ResponseInterceptor } from 'src/common/interceptors/response.interceptor';
import { setupSwagger } from 'src/utils/swagger.util';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());

  setupSwagger(app);

  await app.listen(process.env.PORT || 4000);
}
bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
