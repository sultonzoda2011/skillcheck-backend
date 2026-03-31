"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwtConfig = getJwtConfig;
function getJwtConfig(configService) {
    return {
        secret: configService.getOrThrow('JWT_SECRET'),
        signOptions: {
            algorithm: 'HS256',
        },
        verifyOptions: {
            algorithms: ['HS256'],
            ignoreExpiration: false,
        },
    };
}
//# sourceMappingURL=jwt.config.js.map