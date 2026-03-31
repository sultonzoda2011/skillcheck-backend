export type BestResult = {
    userId: string;
    totalScore: number;
    bestFrontendScore: number;
    bestBackendScore: number;
    bestMobileScore: number;
    frontendAchievedAt: Date | null;
    backendAchievedAt: Date | null;
    mobileAchievedAt: Date | null;
};
export type BestResultUpdateData = Partial<Omit<BestResult, 'userId'>>;
