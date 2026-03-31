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
exports.RefreshResponse = exports.AuthResponse = exports.TokensDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_dto_1 = require("../../profile/dto/user.dto");
class TokensDto {
}
exports.TokensDto = TokensDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'JWT токен доступа для аутентифицированного пользователя',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    }),
    __metadata("design:type", String)
], TokensDto.prototype, "accessToken", void 0);
class AuthResponse {
}
exports.AuthResponse = AuthResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ type: user_dto_1.UserDto }),
    __metadata("design:type", user_dto_1.UserDto)
], AuthResponse.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: TokensDto }),
    __metadata("design:type", TokensDto)
], AuthResponse.prototype, "tokens", void 0);
class RefreshResponse {
}
exports.RefreshResponse = RefreshResponse;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Новый JWT токен доступа',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    }),
    __metadata("design:type", String)
], RefreshResponse.prototype, "accessToken", void 0);
//# sourceMappingURL=auth.dto.js.map