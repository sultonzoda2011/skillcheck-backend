import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { MarathonModule } from './marathon/marathon.module';
import { RandomModule } from './random/random.module';

@Module({
  controllers: [AiController],
  providers: [AiService],
  imports: [MarathonModule, RandomModule],
})
export class AiModule {}
