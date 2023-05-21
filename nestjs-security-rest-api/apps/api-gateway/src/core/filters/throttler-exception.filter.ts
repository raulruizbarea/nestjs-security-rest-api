import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { ThrottlerException } from '@nestjs/throttler';
import { EnvironmentVariables } from '../../config/env.variables';

@Catch(ThrottlerException)
export class ThrottlerExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  catch(exception: ThrottlerException, host: ArgumentsHost) {
    const ttl = this.configService.get('throttle.ttl', { infer: true });
    const limit = this.configService.get('throttle.limit', { infer: true });
    const timestamp = new Date().toISOString();
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse();

    response.setHeader('Retry-After', ttl.toString());

    response.status(HttpStatus.TOO_MANY_REQUESTS).json({
      statusCode: HttpStatus.TOO_MANY_REQUESTS,
      timestamp: timestamp,
      path: request.url,
      info: `Too many requests, limit: ${limit}, ttl: ${ttl}`,
    });
  }
}
