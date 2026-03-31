export declare enum TestType {
    FRONTEND = "frontend",
    BACKEND = "backend",
    MOBILE = "mobile"
}
export declare class SaveBestResultDto {
    type: TestType;
    score: number;
}
