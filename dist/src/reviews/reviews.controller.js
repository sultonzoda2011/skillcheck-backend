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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const authorized_decorator_1 = require("../auth/decorators/authorized.decorator");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const role_guard_1 = require("../common/guards/role.guard");
const create_review_dto_1 = require("./dto/create-review.dto");
const reviews_service_1 = require("./reviews.service");
let ReviewsController = class ReviewsController {
    constructor(reviewsService) {
        this.reviewsService = reviewsService;
    }
    async getReviews() {
        return this.reviewsService.getReviews();
    }
    async createReview(user, dto) {
        return this.reviewsService.createReview(dto, user.id);
    }
    async getPendingReviews() {
        return this.reviewsService.getPendingReviews();
    }
    async approveReview(id) {
        return this.reviewsService.approveReview(id);
    }
};
exports.ReviewsController = ReviewsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить все одобренные отзывы',
        description: 'Возвращает список всех отзывов, которые прошли модерацию администратором.',
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'Список одобренных отзывов успешно получен' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "getReviews", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Создать новый отзыв',
        description: 'Позволяет авторизованному пользователю отправить отзыв о платформе. Отзыв попадет в очередь на модерацию.',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Отзыв успешно создан и отправлен на модерацию',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Пользователь не авторизован' }),
    __param(0, (0, authorized_decorator_1.Authorized)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_review_dto_1.CreateReviewDto]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "createReview", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Get)('/pending'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить список отзывов на модерации',
        description: 'Возвращает список всех новых отзывов, ожидающих одобрения администратором. Доступно только для ADMIN.',
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'Список отзывов на модерации успешно получен' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Недостаточно прав (требуется ADMIN)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "getPendingReviews", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Post)('/approve/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Одобрить отзыв',
        description: 'Меняет статус отзыва на «одобрен», после чего он становится виден всем пользователям. Доступно только для ADMIN.',
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'Отзыв успешно одобрен' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Недостаточно прав (требуется ADMIN)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "approveReview", null);
exports.ReviewsController = ReviewsController = __decorate([
    (0, swagger_1.ApiTags)('Отзывы'),
    (0, common_1.Controller)('reviews'),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService])
], ReviewsController);
//# sourceMappingURL=reviews.controller.js.map