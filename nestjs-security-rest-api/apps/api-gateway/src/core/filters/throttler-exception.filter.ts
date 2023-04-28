import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { ThrottlerException } from '@nestjs/throttler';

@Catch(ThrottlerException)
export class ThrottlerExceptionFilter implements ExceptionFilter {
  constructor(private readonly configService: ConfigService) {}

  catch(exception: ThrottlerException, host: ArgumentsHost) {
    const ttl = this.configService.get('throttle.ttl');
    const timestamp = new Date().toISOString();
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse();

    response.setHeader('Retry-After', ttl.toString());

    response.status(HttpStatus.TOO_MANY_REQUESTS).json({
      statusCode: HttpStatus.TOO_MANY_REQUESTS,
      timestamp: timestamp,
      path: request.url,
      info: 'Too many requests',
    });
  }
}
