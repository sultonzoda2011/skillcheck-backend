import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { AiService } from '@/ai/ai.service';
import { MarathonService } from '@/ai/marathon/marathon.service';
import { MarathonController } from '@/ai/marathon/marathon.controller';

@Module({
  imports: [PrismaModule],
  controllers: [MarathonController],
  providers: [MarathonService, AiService],
})
export class MarathonModule {}
