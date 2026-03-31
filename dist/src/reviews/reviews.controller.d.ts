import { CreateReviewDto } from 'src/reviews/dto/create-review.dto';
import { ReviewsService } from './reviews.service';
import { User } from 'src/generated/prisma/client';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    getReviews(): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        userFullName: string;
        userProfilePicture: string | null;
        text: string;
        rating: number;
        isApproved: boolean;
    }[]>;
    createReview(user: User, dto: CreateReviewDto): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        userFullName: string;
        userProfilePicture: string | null;
        text: string;
        rating: number;
        isApproved: boolean;
    }>;
    getPendingReviews(): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        userFullName: string;
        userProfilePicture: string | null;
        text: string;
        rating: number;
        isApproved: boolean;
    }[]>;
    approveReview(id: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        userFullName: string;
        userProfilePicture: string | null;
        text: string;
        rating: number;
        isApproved: boolean;
    }>;
}
