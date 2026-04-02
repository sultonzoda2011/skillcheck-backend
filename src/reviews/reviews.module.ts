import { ProfileModule } from '@/profile/profile.module';
import { ReviewsController } from '@/reviews/reviews.controller';
import { ReviewsService } from '@/reviews/reviews.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [ProfileModule],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
