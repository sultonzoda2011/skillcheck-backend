import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
export declare function getJwtConfig(configService: ConfigService): JwtModuleOptions;
