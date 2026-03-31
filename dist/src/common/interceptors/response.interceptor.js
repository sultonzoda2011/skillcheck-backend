"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const api_response_dto_1 = require("../dto/api-response.dto");
let ResponseInterceptor = class ResponseInterceptor {
    intercept(context, next) {
        const httpResponse = context.switchToHttp().getResponse();
        const statusCode = httpResponse.statusCode || common_1.HttpStatus.OK;
        return next.handle().pipe((0, operators_1.map)((res) => {
            if (res instanceof api_response_dto_1.ApiResponseDto) {
                return res;
            }
            if (res &&
                typeof res === 'object' &&
                res !== null &&
                'message' in res) {
                const obj = res;
                const message = typeof obj.message === 'string' ? obj.message : 'Операция успешна';
                const data = 'data' in obj && obj.data !== undefined ? obj.data : res;
                return new api_response_dto_1.ApiResponseDto(message, data, statusCode);
            }
            return new api_response_dto_1.ApiResponseDto(this.getDefaultSuccessMessage(statusCode), res, statusCode);
        }));
    }
    getDefaultSuccessMessage(statusCode) {
        if (statusCode === common_1.HttpStatus.CREATED) {
            return 'Ресурс успешно создан';
        }
        if (statusCode >= 200 && statusCode < 300) {
            return 'Операция успешна';
        }
        return 'Запрос выполнен успешно';
    }
};
exports.ResponseInterceptor = ResponseInterceptor;
exports.ResponseInterceptor = ResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], ResponseInterceptor);
//# sourceMappingURL=response.interceptor.js.map