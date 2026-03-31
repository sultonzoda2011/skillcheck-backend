export declare class BestResultDto {
    id: string;
    bestFrontendScore: number;
    bestBackendScore: number;
    bestMobileScore: number;
    frontendAchievedAt?: Date;
    backendAchievedAt?: Date;
    mobileAchievedAt?: Date;
}
export declare class UserDto {
    id: string;
    email: string;
    fullName: string | null;
    profilePicture: string | null;
    createdAt: Date;
    updatedAt: Date;
    bestResult?: BestResultDto | null;
}
