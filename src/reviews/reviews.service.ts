import { Injectable, NotFoundException } from '@nestjs/common';

import { Review } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfileService } from 'src/profile/profile.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly profileService: ProfileService,
  ) {}

  async getReviews(): Promise<Review[]> {
    return this.prismaService.review.findMany({
      where: { isApproved: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createReview(dto: CreateReviewDto, userId: string): Promise<Review> {
    const { rating, text } = dto;

    const user = await this.profileService.getUserById(userId);

    return this.prismaService.review.create({
      data: {
        text,
        rating,
        userId,
        userFullName: user.fullName ?? '',
        userProfilePicture: user.profilePicture,
        isApproved: false,
      },
    });
  }
  async getPendingReviews(): Promise<Review[]> {
    return this.prismaService.review.findMany({
      where: { isApproved: false },
      orderBy: { createdAt: 'desc' },
    });
  }
  async approveReview(id: string): Promise<Review> {
    const review = await this.prismaService.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }

    return this.prismaService.review.update({
      where: { id },
      data: { isApproved: true },
    });
  }
}
