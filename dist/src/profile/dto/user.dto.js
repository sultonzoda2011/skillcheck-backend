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
exports.UserDto = exports.BestResultDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class BestResultDto {
}
exports.BestResultDto = BestResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' }),
    __metadata("design:type", String)
], BestResultDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Лучший результат во фронтенд тесте',
        example: 85,
    }),
    __metadata("design:type", Number)
], BestResultDto.prototype, "bestFrontendScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Лучший результат в бэкенд тесте', example: 90 }),
    __metadata("design:type", Number)
], BestResultDto.prototype, "bestBackendScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Лучший результат в мобильном тесте',
        example: 75,
    }),
    __metadata("design:type", Number)
], BestResultDto.prototype, "bestMobileScore", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Дата достижения результата во фронтенде',
        example: '2024-03-29T12:00:00Z',
    }),
    __metadata("design:type", Date)
], BestResultDto.prototype, "frontendAchievedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Дата достижения результата в бэкенде',
        example: '2024-03-29T12:00:00Z',
    }),
    __metadata("design:type", Date)
], BestResultDto.prototype, "backendAchievedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Дата достижения результата в мобильной разработке',
        example: '2024-03-29T12:00:00Z',
    }),
    __metadata("design:type", Date)
], BestResultDto.prototype, "mobileAchievedAt", void 0);
class UserDto {
}
exports.UserDto = UserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' }),
    __metadata("design:type", String)
], UserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@example.com' }),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Иван Иванов', nullable: true }),
    __metadata("design:type", Object)
], UserDto.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '/uploads/avatars/avatar.jpg',
        nullable: true,
    }),
    __metadata("design:type", Object)
], UserDto.prototype, "profilePicture", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-03-29T12:00:00Z' }),
    __metadata("design:type", Date)
], UserDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-03-29T12:00:00Z' }),
    __metadata("design:type", Date)
], UserDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: BestResultDto, nullable: true }),
    __metadata("design:type", Object)
], UserDto.prototype, "bestResult", void 0);
//# sourceMappingURL=user.dto.js.map