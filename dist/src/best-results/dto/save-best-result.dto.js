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
exports.SaveBestResultDto = exports.TestType = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var TestType;
(function (TestType) {
    TestType["FRONTEND"] = "frontend";
    TestType["BACKEND"] = "backend";
    TestType["MOBILE"] = "mobile";
})(TestType || (exports.TestType = TestType = {}));
class SaveBestResultDto {
}
exports.SaveBestResultDto = SaveBestResultDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Тип теста, для которого сохраняется результат',
        enum: TestType,
        example: 'frontend',
    }),
    (0, class_validator_1.IsEnum)(TestType, {
        message: 'Тип теста должен быть frontend, backend или mobile',
    }),
    __metadata("design:type", String)
], SaveBestResultDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Набранный балл в тесте',
        example: 1250,
        minimum: 0,
    }),
    (0, class_validator_1.IsInt)({ message: 'Score должен быть целым числом' }),
    (0, class_validator_1.IsPositive)({ message: 'Score должен быть положительным числом' }),
    (0, class_validator_1.Min)(0, { message: 'Score не может быть отрицательным' }),
    __metadata("design:type", Number)
], SaveBestResultDto.prototype, "score", void 0);
//# sourceMappingURL=save-best-result.dto.js.map