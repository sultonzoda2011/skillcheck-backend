"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const swagger_1 = require("@nestjs/swagger");
const swagger_config_1 = require("../config/swagger.config");
function setupSwagger(app) {
    const config = (0, swagger_config_1.getSwaggerConfig)()
        .setContact('Sultonzoda Abdulloh', 'https://skillcheck.kavsaracademy.tj', 'sultonzoda2011@gmail.com')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config, {});
    swagger_1.SwaggerModule.setup('api-docs', app, document, {
        jsonDocumentUrl: '/swagger/json',
        yamlDocumentUrl: '/swagger/yaml',
    });
}
//# sourceMappingURL=swagger.util.js.map