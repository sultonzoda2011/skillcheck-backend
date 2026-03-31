import { Review } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfileService } from 'src/profile/profile.service';
import { CreateReviewDto } from './dto/create-review.dto';
export declare class ReviewsService {
    private readonly prismaService;
    private readonly profileService;
    constructor(prismaService: PrismaService, profileService: ProfileService);
    getReviews(): Promise<Review[]>;
    createReview(dto: CreateReviewDto, userId: string): Promise<Review>;
    getPendingReviews(): Promise<Review[]>;
    approveReview(id: string): Promise<Review>;
}
