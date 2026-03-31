import { UpdateUserStatusDto } from 'src/admin/dto/update-user-status.dto';
import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getAllUsers(): Promise<{
        id: string;
        email: string;
        fullName: string | null;
        profilePicture: string | null;
        createdAt: Date;
        updatedAt: Date;
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
    }[]>;
    updateUserStatus(dto: UpdateUserStatusDto): Promise<{
        id: string;
        email: string;
        fullName: string | null;
        profilePicture: string | null;
        createdAt: Date;
        updatedAt: Date;
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
    }>;
}
