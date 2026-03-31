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
exports.CreateReviewDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateReviewDto {
    constructor() {
        this.rating = 5;
    }
}
exports.CreateReviewDto = CreateReviewDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Текст отзыва о платформе',
        example: 'Попробовал SkillCheck — реально свежий формат подготовки к собеседованиям. За счёт Google Gemini вопросы каждый раз новые...',
        minLength: 10,
        maxLength: 1000,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Текст отзыва обязателен' }),
    (0, class_validator_1.MinLength)(10, { message: 'Текст должен содержать минимум 10 символов' }),
    (0, class_validator_1.MaxLength)(1000, { message: 'Текст не должен превышать 1000 символов' }),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Рейтинг платформы от 1 до 5 звезд',
        example: 5,
        minimum: 1,
        maximum: 5,
        default: 5,
    }),
    (0, class_validator_1.IsInt)({ message: 'Рейтинг должен быть целым числом' }),
    (0, class_validator_1.Min)(1, { message: 'Рейтинг не может быть меньше 1' }),
    (0, class_validator_1.Max)(5, { message: 'Рейтинг не может быть больше 5' }),
    __metadata("design:type", Number)
], CreateReviewDto.prototype, "rating", void 0);
//# sourceMappingURL=create-review.dto.js.map