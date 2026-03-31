"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSwaggerConfig = getSwaggerConfig;
const swagger_1 = require("@nestjs/swagger");
function getSwaggerConfig() {
    return new swagger_1.DocumentBuilder()
        .setTitle('SkillCheck API')
        .setDescription('Документация API для платформы проверки навыков SkillCheck. ' +
        'Здесь вы найдете все доступные эндпоинты для авторизации, управления профилем, просмотра результатов тестов и отзывов.')
        .setVersion('1.0.0')
        .addBearerAuth()
        .addSecurityRequirements('bearer');
}
//# sourceMappingURL=swagger.config.js.map