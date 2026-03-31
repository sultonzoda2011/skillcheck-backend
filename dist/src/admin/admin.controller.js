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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const update_user_status_dto_1 = require("./dto/update-user-status.dto");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const role_guard_1 = require("../common/guards/role.guard");
const admin_service_1 = require("./admin.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async getAllUsers() {
        return this.adminService.getAllUsers();
    }
    async updateUserStatus(dto) {
        return this.adminService.updateUserStatus(dto);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('users'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить список всех пользователей',
        description: 'Возвращает полную информацию обо всех зарегистрированных пользователях в системе. Доступно только администраторам.',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Список пользователей успешно получен',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiForbiddenResponse)({
        description: 'Недостаточно прав (требуется роль ADMIN)',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Post)('user/status'),
    (0, swagger_1.ApiOperation)({
        summary: 'Изменить статус блокировки пользователя',
        description: 'Позволяет заблокировать или разблокировать доступ пользователя к системе. Доступно только администраторам.',
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'Статус пользователя успешно обновлён' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Некорректные данные в запросе' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Пользователь не авторизован' }),
    (0, swagger_1.ApiForbiddenResponse)({
        description: 'Недостаточно прав (требуется роль ADMIN)',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_status_dto_1.UpdateUserStatusDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateUserStatus", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('Администрирование'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, common_1.Controller)('admin'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map