import { ConfigService } from '@nestjs/config';

export const isDev = (configService: ConfigService) =>
  configService.getOrThrow<string>('NODE_ENV') === 'development';
