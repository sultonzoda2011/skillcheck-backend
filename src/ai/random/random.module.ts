import { AiService } from '@/ai/ai.service';
import { RandomController } from '@/ai/random/random.controller';
import { RandomService } from '@/ai/random/random.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  controllers: [RandomController],
  providers: [RandomService, AiService],
})
export class RandomModule {}
