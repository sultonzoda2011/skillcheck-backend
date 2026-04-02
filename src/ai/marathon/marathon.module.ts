import { Module } from '@nestjs/common';
import { MarathonController } from './marathon.controller';
import { MarathonService } from './marathon.service';
import { AiService } from '../ai.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MarathonController],
  providers: [MarathonService, AiService],
})
export class MarathonModule {}
