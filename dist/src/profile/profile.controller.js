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
exports.ProfileController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const authorization_decorator_1 = require("../auth/decorators/authorization.decorator");
const authorized_decorator_1 = require("../auth/decorators/authorized.decorator");
const update_profile_dto_1 = require("./dto/update-profile.dto");
const profile_service_1 = require("./profile.service");
const change_password_dto_1 = require("./dto/change-password.dto");
const user_dto_1 = require("./dto/user.dto");
let ProfileController = class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
    }
    async profile(user) {
        return this.profileService.getUserById(user.id);
    }
    async updateProfile(currentUser, updateProfileDto, profilePicture) {
        return this.profileService.updateProfile(currentUser.id, updateProfileDto, profilePicture);
    }
    async changePassword(user, dto) {
        return this.profileService.changePassword(user.id, dto);
    }
};
exports.ProfileController = ProfileController;
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Получить данные текущего пользователя',
        description: 'Возвращает подробную информацию о профиле авторизованного пользователя, включая его персональные данные и лучшие результаты тестов.',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: user_dto_1.UserDto,
        description: 'Данные профиля успешно получены',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Пользователь не авторизован или сессия истекла',
    }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(''),
    __param(0, (0, authorized_decorator_1.Authorized)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "profile", null);
__decorate([
    (0, common_1.Patch)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Обновить информацию профиля',
        description: 'Позволяет изменить имя пользователя, его email (если не занят) и загрузить новую аватарку. Использует multipart/form-data для поддержки загрузки файлов.',
    }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('profilePicture')),
    (0, swagger_1.ApiBody)({
        type: update_profile_dto_1.UpdateProfileDto,
        description: 'Объект с данными для обновления и файл изображения',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: user_dto_1.UserDto,
        description: 'Профиль успешно обновлён. Возвращает актуальные данные пользователя.',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Некорректные данные или неподдерживаемый формат изображения',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Пользователь не авторизован',
    }),
    __param(0, (0, authorized_decorator_1.Authorized)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_profile_dto_1.UpdateProfileDto, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Post)('change-password'),
    (0, swagger_1.ApiOperation)({
        summary: 'Смена пароля',
        description: 'Безопасное изменение текущего пароля пользователя. Требует ввода старого пароля и подтверждения нового.',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Пароль успешно изменён',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Старый пароль введен неверно или новый пароль не соответствует требованиям безопасности',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Пользователь не авторизован',
    }),
    __param(0, (0, authorized_decorator_1.Authorized)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_password_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "changePassword", null);
exports.ProfileController = ProfileController = __decorate([
    (0, swagger_1.ApiTags)('Профиль'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, authorization_decorator_1.Authorization)(),
    (0, common_1.Controller)('profile'),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileController);
//# sourceMappingURL=profile.controller.js.map