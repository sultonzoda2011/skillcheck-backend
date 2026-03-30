import { Module } from '@nestjs/common';
import { BestResultsService } from './best-results.service';
import { BestResultsController } from './best-results.controller';

@Module({
  controllers: [BestResultsController],
  providers: [BestResultsService],
})
export class BestResultsModule {}
