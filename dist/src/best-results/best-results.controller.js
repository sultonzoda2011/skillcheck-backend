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
exports.BestResultsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const authorization_decorator_1 = require("../auth/decorators/authorization.decorator");
const authorized_decorator_1 = require("../auth/decorators/authorized.decorator");
const save_best_result_dto_1 = require("./dto/save-best-result.dto");
const best_results_service_1 = require("./best-results.service");
let BestResultsController = class BestResultsController {
    constructor(bestResultsService) {
        this.bestResultsService = bestResultsService;
    }
    async getMyBest(user) {
        return this.bestResultsService.getBestResults(user.id);
    }
    async saveBestResult(user, dto) {
        return this.bestResultsService.saveBestResult(user.id, dto);
    }
    async getLeaderboard() {
        return this.bestResultsService.getLeaderboard();
    }
    async getLeaderboard5() {
        return this.bestResultsService.getLeaderboard5();
    }
};
exports.BestResultsController = BestResultsController;
__decorate([
    (0, common_1.Get)('my-best'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, authorization_decorator_1.Authorization)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить лучшие результаты текущего пользователя',
        description: 'Возвращает список лучших результатов пользователя по всем категориям тестов (Frontend, Backend, Mobile).',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Лучшие результаты пользователя успешно получены',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Пользователь не авторизован' }),
    __param(0, (0, authorized_decorator_1.Authorized)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BestResultsController.prototype, "getMyBest", null);
__decorate([
    (0, common_1.Post)('my-best'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, authorization_decorator_1.Authorization)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Сохранить или обновить лучший результат',
        description: 'Обновляет рекорд пользователя в определенной категории. Если новый результат выше текущего — он сохраняется как лучший. Обновляется также дата достижения рекорда.',
    }),
    (0, swagger_1.ApiOkResponse)({ description: 'Результат успешно сохранён или обновлён' }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Некорректные данные (неверный тип теста или отрицательный балл)',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Пользователь не авторизован' }),
    __param(0, (0, authorized_decorator_1.Authorized)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, save_best_result_dto_1.SaveBestResultDto]),
    __metadata("design:returntype", Promise)
], BestResultsController.prototype, "saveBestResult", null);
__decorate([
    (0, common_1.Get)('leaderboard'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить полный лидерборд (Топ-15)',
        description: 'Возвращает 15 лучших пользователей по их самому высокому баллу. Публичный доступ.',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Список 15 лучших пользователей успешно получен',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BestResultsController.prototype, "getLeaderboard", null);
__decorate([
    (0, common_1.Get)('leaderboard-5'),
    (0, swagger_1.ApiOperation)({
        summary: 'Получить краткий лидерборд (Топ-5)',
        description: 'Возвращает 5 лучших пользователей. Используется для виджетов на главной странице. Публичный доступ.',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Список 5 лучших пользователей успешно получен',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BestResultsController.prototype, "getLeaderboard5", null);
exports.BestResultsController = BestResultsController = __decorate([
    (0, swagger_1.ApiTags)('Результаты тестов'),
    (0, common_1.Controller)('best-results'),
    __metadata("design:paramtypes", [best_results_service_1.BestResultsService])
], BestResultsController);
//# sourceMappingURL=best-results.controller.js.map