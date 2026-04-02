import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AiService } from '../ai.service';
import { RandomController } from './random.controller';
import { RandomService } from './random.service';

@Module({
  imports: [PrismaModule],
  controllers: [RandomController],
  providers: [RandomService, AiService],
})
export class RandomModule {}
