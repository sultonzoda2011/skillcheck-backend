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
exports.RegisterRequest = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RegisterRequest {
}
exports.RegisterRequest = RegisterRequest;
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'fullName',
        description: 'Полное имя пользователя',
        example: 'Иван Иванов',
        maxLength: 50,
    }),
    (0, class_validator_1.IsString)({ message: 'Имя должно быть строкой' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Имя обязательно для заполнения' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Имя должно содержать максимум 50 символов' }),
    __metadata("design:type", String)
], RegisterRequest.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'email',
        description: 'Email адрес пользователя',
        example: 'john.doe@example.com',
        maxLength: 255,
    }),
    (0, class_validator_1.IsString)({ message: 'Email должен быть строкой' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email обязателен для заполнения' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email должен быть валидным адресом электронной почты' }),
    __metadata("design:type", String)
], RegisterRequest.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'password',
        description: 'Пароль пользователя',
        example: 'SecurePassword123',
        minLength: 6,
        maxLength: 128,
    }),
    (0, class_validator_1.IsString)({ message: 'Пароль должен быть строкой' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Пароль обязателен для заполнения' }),
    (0, class_validator_1.MinLength)(6, { message: 'Пароль должен содержать минимум 6 символов' }),
    (0, class_validator_1.MaxLength)(128, { message: 'Пароль должен содержать максимум 128 символов' }),
    __metadata("design:type", String)
], RegisterRequest.prototype, "password", void 0);
//# sourceMappingURL=register.dto.js.map