import { LoginRequest } from 'src/auth/dto/login.dto';
import { RegisterRequest } from 'src/auth/dto/register.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(res: Response, dto: RegisterRequest): Promise<{
        user: {
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
            };
            id: string;
            email: string;
            fullName: string | null;
            profilePicture: string | null;
            createdAt: Date;
            updatedAt: Date;
            role: import("../generated/prisma/enums").UserRole;
            isBlocked: boolean;
        };
        tokens: {
            accessToken: string;
        };
    }>;
    login(res: Response, dto: LoginRequest): Promise<{
        user: {
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
            role: import("../generated/prisma/enums").UserRole;
            isBlocked: boolean;
        };
        tokens: {
            accessToken: string;
        };
    }>;
    refresh(req: Request, res: Response): Promise<{
        accessToken: string;
    }>;
    logout(res: Response): Promise<{
        message: string;
    }>;
}
