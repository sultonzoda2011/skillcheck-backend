import { User } from 'src/generated/prisma/browser';
import { UpdateProfileDto } from 'src/profile/dto/update-profile.dto';
import { ProfileService } from './profile.service';
import { ChangePasswordDto } from 'src/profile/dto/change-password.dto';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    profile(user: User): Promise<{
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
    updateProfile(currentUser: User, updateProfileDto: UpdateProfileDto, profilePicture?: Express.Multer.File): Promise<import("./types").SafeUser>;
    changePassword(user: User, dto: ChangePasswordDto): Promise<void>;
}
