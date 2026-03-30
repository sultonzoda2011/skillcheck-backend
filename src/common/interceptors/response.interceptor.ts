/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';

@Injectable()
export class ResponseInterceptor<T = any> implements NestInterceptor<
  T,
  ApiResponseDto<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiResponseDto<T>> {
    const httpResponse = context.switchToHttp().getResponse<Response>();
    const statusCode: number = httpResponse.statusCode || HttpStatus.OK;

    return next.handle().pipe(
      map((res: T): ApiResponseDto<T> => {
        if (res instanceof ApiResponseDto) {
          return res;
        }

        if (
          res &&
          typeof res === 'object' &&
          res !== null &&
          'message' in res
        ) {
          const obj = res as Record<string, any>;
          const message =
            typeof obj.message === 'string' ? obj.message : 'Операция успешна';
          const data = 'data' in obj && obj.data !== undefined ? obj.data : res;

          return new ApiResponseDto<T>(message, data as T, statusCode);
        }

        return new ApiResponseDto<T>(
          this.getDefaultSuccessMessage(statusCode),
          res,
          statusCode,
        );
      }),
    );
  }

  private getDefaultSuccessMessage(statusCode: number): string {
    if (statusCode === HttpStatus.CREATED) {
      return 'Ресурс успешно создан';
    }
    if (statusCode >= 200 && statusCode < 300) {
      return 'Операция успешна';
    }
    return 'Запрос выполнен успешно';
  }
}
