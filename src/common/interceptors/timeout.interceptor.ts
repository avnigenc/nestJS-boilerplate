import {
  Injectable, NestInterceptor, ExecutionContext, CallHandler, RequestTimeoutException,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class TimeoutInterceptor implements NestInterceptor {
  constructor(private configService: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const timeoutValue = this.configService.get('REQUEST_TIMEOUT');
    return next.handle().pipe(
      timeout(timeoutValue),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(new RequestTimeoutException());
        }
        return throwError(err);
      }),
    );
  }
}
