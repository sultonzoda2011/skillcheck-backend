"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BestResultsModule = void 0;
const common_1 = require("@nestjs/common");
const best_results_service_1 = require("./best-results.service");
const best_results_controller_1 = require("./best-results.controller");
let BestResultsModule = class BestResultsModule {
};
exports.BestResultsModule = BestResultsModule;
exports.BestResultsModule = BestResultsModule = __decorate([
    (0, common_1.Module)({
        controllers: [best_results_controller_1.BestResultsController],
        providers: [best_results_service_1.BestResultsService],
    })
], BestResultsModule);
//# sourceMappingURL=best-results.module.js.map