import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { Request, Response } from 'express';
import { LoginRequest } from 'src/auth/dto/login.dto';
import { RegisterRequest } from 'src/auth/dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AuthService {
    private readonly prismaService;
    private readonly configService;
    private readonly jwtService;
    private readonly JWT_ACCESS_TOKEN_TTL;
    private readonly JWT_REFRESH_TOKEN_TTL;
    private readonly COOKIE_DOMAIN;
    private setCookie;
    constructor(prismaService: PrismaService, configService: ConfigService, jwtService: JwtService);
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
    refresh(res: Response, req: Request): Promise<{
        accessToken: string;
    }>;
    private auth;
    private generateTokens;
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
    logout(res: Response): Promise<{
        message: string;
    }>;
}
