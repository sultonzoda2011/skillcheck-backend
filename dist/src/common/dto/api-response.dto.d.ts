export declare class ApiResponseDto<T = any> {
    message: string;
    data: T | [];
    status: number;
    constructor(message: string, data?: T | [], status?: number);
}
