"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BestResultsService = void 0;
const common_1 = require("@nestjs/common");
const save_best_result_dto_1 = require("./dto/save-best-result.dto");
const prisma_service_1 = require("../prisma/prisma.service");
let BestResultsService = class BestResultsService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getBestResults(userId) {
        const bestResult = await this.prismaService.bestResult.findUnique({
            where: { userId },
        });
        return bestResult;
    }
    async saveBestResult(userId, dto) {
        const bestResult = await this.getBestResults(userId);
        const { type, score } = dto;
        const updateData = {};
        const totalScore = score + (bestResult?.totalScore ?? 0);
        updateData.totalScore = totalScore;
        if (type === save_best_result_dto_1.TestType.FRONTEND &&
            score > (bestResult?.bestFrontendScore ?? 0)) {
            updateData.bestFrontendScore = score;
            updateData.frontendAchievedAt = new Date();
        }
        if (type === save_best_result_dto_1.TestType.BACKEND &&
            score > (bestResult?.bestBackendScore ?? 0)) {
            updateData.bestBackendScore = score;
            updateData.backendAchievedAt = new Date();
        }
        if (type === save_best_result_dto_1.TestType.MOBILE &&
            score > (bestResult?.bestMobileScore ?? 0)) {
            updateData.bestMobileScore = score;
            updateData.mobileAchievedAt = new Date();
        }
        if (Object.keys(updateData).length === 0) {
            return undefined;
        }
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
            return (element.bestResult?.totalScore && element.bestResult.totalScore > 0);
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
            return (element.bestResult?.totalScore && element.bestResult.totalScore > 0);
        });
        return leaderboardFiltered.map((element, index) => ({
            ...element,
            rank: index + 1,
        }));
    }
};
exports.BestResultsService = BestResultsService;
exports.BestResultsService = BestResultsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BestResultsService);
//# sourceMappingURL=best-results.service.js.map