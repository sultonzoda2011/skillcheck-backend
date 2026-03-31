"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorization = Authorization;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../guards/auth.guard");
function Authorization() {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(auth_guard_1.JwtGuard), (0, swagger_1.ApiBearerAuth)());
}
//# sourceMappingURL=authorization.decorator.js.map