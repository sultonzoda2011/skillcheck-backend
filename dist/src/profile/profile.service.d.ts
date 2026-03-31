import { PrismaService } from 'src/prisma/prisma.service';
import { ChangePasswordDto } from 'src/profile/dto/change-password.dto';
import { UpdateProfileDto } from 'src/profile/dto/update-profile.dto';
import { MulterFile, SafeUser } from './types';
export declare class ProfileService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getUserById(userId: string): Promise<{
        password: undefined;
        bestResult: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            bestFrontendScore: number;
            bestBackendScore: number;
            bestMobileScore: number;
            totalScore: number;
            frontendAchievedAt: Date | null;
            backendAchievedAt: Date | null;
            mobileAchievedAt: Date | null;
        } | null;
        id: string;
        email: string;
        fullName: string | null;
        profilePicture: string | null;
        createdAt: Date;
        updatedAt: Date;
        role: import("src/generated/prisma/browser").UserRole;
        isBlocked: boolean;
    }>;
    updateProfile(userId: string, dto: UpdateProfileDto, file?: MulterFile): Promise<SafeUser>;
    changePassword(userId: string, dto: ChangePasswordDto): Promise<void>;
    private applyNameUpdate;
    private applyEmailUpdate;
    private applyAvatarUpdate;
    private deleteOldAvatar;
    private assertEmailNotTaken;
    private validateMimeType;
    private saveAvatarFile;
    private saveUser;
}
