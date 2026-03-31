import { SaveBestResultDto } from 'src/best-results/dto/save-best-result.dto';
import { User } from 'src/generated/prisma/browser';
import { BestResultsService } from './best-results.service';
export declare class BestResultsController {
    private readonly bestResultsService;
    constructor(bestResultsService: BestResultsService);
    getMyBest(user: User): Promise<{
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
    saveBestResult(user: User, dto: SaveBestResultDto): Promise<import("./types/best-result.types").BestResult | undefined>;
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
