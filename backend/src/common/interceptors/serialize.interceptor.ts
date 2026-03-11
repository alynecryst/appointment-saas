import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors
} from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs/operators';

export function Serialize(dto: any) {

  return UseInterceptors(
    new (class implements NestInterceptor {
      intercept(context: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(
          map((data: any) => {
            return plainToInstance(dto, data, {
              excludeExtraneousValues: true
            });
          })
        );
      }
    })()
  );

}