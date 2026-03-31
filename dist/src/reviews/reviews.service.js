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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const profile_service_1 = require("../profile/profile.service");
let ReviewsService = class ReviewsService {
    constructor(prismaService, profileService) {
        this.prismaService = prismaService;
        this.profileService = profileService;
    }
    async getReviews() {
        return this.prismaService.review.findMany({
            where: { isApproved: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async createReview(dto, userId) {
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
    async getPendingReviews() {
        return this.prismaService.review.findMany({
            where: { isApproved: false },
            orderBy: { createdAt: 'desc' },
        });
    }
    async approveReview(id) {
        const review = await this.prismaService.review.findUnique({
            where: { id },
        });
        if (!review) {
            throw new common_1.NotFoundException(`Review with id ${id} not found`);
        }
        return this.prismaService.review.update({
            where: { id },
            data: { isApproved: true },
        });
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        profile_service_1.ProfileService])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map