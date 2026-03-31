"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
const prisma_service_1 = require("../prisma/prisma.service");
const avatar_constants_1 = require("./constants/avatar.constants");
const types_1 = require("./types");
const bcrypt = __importStar(require("bcrypt"));
let ProfileService = class ProfileService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getUserById(userId) {
        if (!userId) {
            throw new common_1.BadRequestException('userId is required');
        }
        const user = await this.prismaService.user.findUnique({
            where: { id: userId },
            include: { bestResult: true },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return { ...user, password: undefined };
    }
    async updateProfile(userId, dto, file) {
        const updateData = {};
        this.applyNameUpdate(dto, updateData);
        await this.applyEmailUpdate(userId, dto, updateData);
        await this.applyAvatarUpdate(userId, file, updateData);
        const oldAvatarPath = updateData.__oldAvatarPath;
        delete updateData.__oldAvatarPath;
        const result = await this.saveUser(userId, updateData);
        if (oldAvatarPath) {
            await this.deleteOldAvatar(oldAvatarPath);
        }
        return result;
    }
    async changePassword(userId, dto) {
        const { newPassword, confirmPassword, oldPassword } = dto;
        if (!userId) {
            throw new common_1.BadRequestException('userId is required');
        }
        const user = await this.prismaService.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) {
            throw new common_1.BadRequestException('Invalid old password');
        }
        if (newPassword !== confirmPassword) {
            throw new common_1.BadRequestException('Passwords do not match');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.prismaService.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });
    }
    applyNameUpdate(dto, updateData) {
        if (dto.fullName) {
            updateData.fullName = dto.fullName;
        }
    }
    async applyEmailUpdate(userId, dto, updateData) {
        if (!dto.email)
            return;
        await this.assertEmailNotTaken(userId, dto.email);
        updateData.email = dto.email;
    }
    async applyAvatarUpdate(userId, file, updateData) {
        if (!file)
            return;
        this.validateMimeType(file.mimetype);
        const currentUser = await this.prismaService.user.findUnique({
            where: { id: userId },
            select: { profilePicture: true },
        });
        const avatarPath = await this.saveAvatarFile(userId, file);
        updateData.profilePicture = avatarPath;
        if (currentUser?.profilePicture) {
            updateData.__oldAvatarPath = currentUser.profilePicture;
        }
    }
    async deleteOldAvatar(profilePicturePath) {
        try {
            const absolutePath = (0, avatar_constants_1.resolveAvatarPath)(profilePicturePath);
            await fs.unlink(absolutePath);
        }
        catch (error) {
            if (error.code !== 'ENOENT') {
                console.warn(`Failed to delete old avatar: ${profilePicturePath}`, error);
            }
        }
    }
    async assertEmailNotTaken(userId, email) {
        const existingUser = await this.prismaService.user.findUnique({
            where: { email },
        });
        if (existingUser && existingUser.id !== userId) {
            throw new common_1.BadRequestException('Этот email уже используется другим пользователем');
        }
    }
    validateMimeType(mimetype) {
        if (!avatar_constants_1.ALLOWED_MIME_TYPES.includes(mimetype)) {
            throw new common_1.BadRequestException('Разрешены только изображения: jpg, png, webp');
        }
    }
    async saveAvatarFile(userId, file) {
        await fs.mkdir(avatar_constants_1.AVATARS_DIR, { recursive: true });
        const ext = path.extname(file.originalname);
        const fileName = `${userId}-${Date.now()}${ext}`;
        const filePath = path.join(avatar_constants_1.AVATARS_DIR, fileName);
        await fs.writeFile(filePath, file.buffer);
        return `${avatar_constants_1.AVATARS_URL_PREFIX}/${fileName}`;
    }
    async saveUser(userId, updateData) {
        return this.prismaService.user.update({
            where: { id: userId },
            data: updateData,
            select: types_1.USER_SAFE_SELECT,
        });
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProfileService);
//# sourceMappingURL=profile.service.js.map