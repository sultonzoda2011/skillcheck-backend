import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
export declare class ResponseInterceptor<T = any> implements NestInterceptor<T, ApiResponseDto<T>> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponseDto<T>>;
    private getDefaultSuccessMessage;
}
