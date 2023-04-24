import { ArgumentsHost, Catch, Inject } from '@nestjs/common';

import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import * as Sentry from '@sentry/node';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Catch()
export class MicroServiceExceptionFilter extends BaseRpcExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    super();
  }
  catch(exception: any, host: ArgumentsHost) {
    const timestamp = new Date().toISOString();
    this.logger.error({
      message: exception.message,
      stack: exception.stack,
      extra: {
        statusCode: exception.error.statusCode,
        timestamp,
      },
    });

    if (exception.error.statusCode >= 500) {
      Sentry.captureException(exception, {
        extra: {
          timestamp,
          statusCode: exception.error.statusCode,
          message: exception.message,
          stack: exception.stack,
        },
      });
    }

    return super.catch(exception, host);
  }
}
