import { ArgumentsHost, Catch, Inject } from '@nestjs/common';

import { BaseRpcExceptionFilter } from '@nestjs/microservices';
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
    if (exception.error.statusCode >= 500) {
      console.log('microservice exception');
      this.logger.error({
        message: exception.message,
        stack: exception.stack,
        extra: {
          statusCode: exception.error.statusCode,
          timestamp: new Date().toISOString(),
        },
      });
    }

    return super.catch(exception, host);
  }
}
