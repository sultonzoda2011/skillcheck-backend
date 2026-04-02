import {
  SaveBestResultDto,
  TestType,
} from '@/best-results/dto/save-best-result.dto';
import { BestResultUpdateData } from '@/best-results/types/best-result.types';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { BestResult } from '@prisma/client';

@Injectable()
export class BestResultsService {
  constructor(private readonly prismaService: PrismaService) {}
  async getBestResults(userId: string) {
    const bestResult = await this.prismaService.bestResult.findUnique({
      where: { userId },
    });
    return bestResult;
  }

  async saveBestResult(
    userId: string,
    dto: SaveBestResultDto,
  ): Promise<BestResult | undefined> {
    const bestResult = await this.getBestResults(userId);
    const { type, score } = dto;

    const updateData: BestResultUpdateData = {};

    if (
      type === TestType.FRONTEND &&
      score > (bestResult?.bestFrontendScore ?? 0)
    ) {
      updateData.bestFrontendScore = score;
      updateData.frontendAchievedAt = new Date();
    }

    if (
      type === TestType.BACKEND &&
      score > (bestResult?.bestBackendScore ?? 0)
    ) {
      updateData.bestBackendScore = score;
      updateData.backendAchievedAt = new Date();
    }

    if (
      type === TestType.MOBILE &&
      score > (bestResult?.bestMobileScore ?? 0)
    ) {
      updateData.bestMobileScore = score;
      updateData.mobileAchievedAt = new Date();
    }

    if (Object.keys(updateData).length === 0) {
      return undefined;
    }

    const newFrontend =
      updateData.bestFrontendScore ?? bestResult?.bestFrontendScore ?? 0;
    const newBackend =
      updateData.bestBackendScore ?? bestResult?.bestBackendScore ?? 0;
    const newMobile =
      updateData.bestMobileScore ?? bestResult?.bestMobileScore ?? 0;
    updateData.totalScore = newFrontend + newBackend + newMobile;

    return this.prismaService.bestResult.update({
      where: { userId },
      data: updateData,
    });
  }
  async getLeaderboard() {
    const leaderboard = await this.prismaService.user.findMany({
      take: 15,
      orderBy: {
        bestResult: {
          totalScore: 'desc',
        },
      },
      select: {
        id: true,
        fullName: true,
        profilePicture: true,
        bestResult: true,
        email: true,
      },
    });

    const leaderboardFiltered = leaderboard.filter((element) => {
      return (
        element.bestResult?.totalScore && element.bestResult.totalScore > 0
      );
    });
    return leaderboardFiltered.map((element, index) => ({
      ...element,
      rank: index + 1,
    }));
  }
  async getLeaderboard5() {
    const leaderboard = await this.prismaService.user.findMany({
      take: 5,
      orderBy: {
        bestResult: {
          totalScore: 'desc',
        },
      },
      select: {
        id: true,
        fullName: true,
        profilePicture: true,
        bestResult: true,
        email: true,
      },
    });

    const leaderboardFiltered = leaderboard.filter((element) => {
      return (
        element.bestResult?.totalScore && element.bestResult.totalScore > 0
      );
    });
    return leaderboardFiltered.map((element, index) => ({
      ...element,
      rank: index + 1,
    }));
  }
}
