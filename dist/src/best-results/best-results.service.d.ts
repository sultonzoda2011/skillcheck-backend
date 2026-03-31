import { SaveBestResultDto } from 'src/best-results/dto/save-best-result.dto';
import { BestResult } from 'src/best-results/types/best-result.types';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class BestResultsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getBestResults(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        bestFrontendScore: number;
        bestBackendScore: number;
        bestMobileScore: number;
        totalScore: number;
        frontendAchievedAt: Date | null;
        backendAchievedAt: Date | null;
        mobileAchievedAt: Date | null;
    } | null>;
    saveBestResult(userId: string, dto: SaveBestResultDto): Promise<BestResult | undefined>;
    getLeaderboard(): Promise<{
        rank: number;
        id: string;
        email: string;
        fullName: string | null;
        profilePicture: string | null;
        bestResult: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            bestFrontendScore: number;
            bestBackendScore: number;
            bestMobileScore: number;
            totalScore: number;
            frontendAchievedAt: Date | null;
            backendAchievedAt: Date | null;
            mobileAchievedAt: Date | null;
        } | null;
    }[]>;
    getLeaderboard5(): Promise<{
        rank: number;
        id: string;
        email: string;
        fullName: string | null;
        profilePicture: string | null;
        bestResult: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            bestFrontendScore: number;
            bestBackendScore: number;
            bestMobileScore: number;
            totalScore: number;
            frontendAchievedAt: Date | null;
            backendAchievedAt: Date | null;
            mobileAchievedAt: Date | null;
        } | null;
    }[]>;
}
