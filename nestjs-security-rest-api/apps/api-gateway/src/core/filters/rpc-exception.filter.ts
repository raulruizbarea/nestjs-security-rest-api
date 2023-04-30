import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Inject,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Catch()
export class RcpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const timestamp = new Date().toISOString();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const _error = this._getError(exception);

    response.status(_error.statusCode).json({
      statusCode: _error.statusCode,
      timestamp: timestamp,
      path: request.url,
      info: _error.message,
    });
  }

  _getError(exception: any): {
    statusCode: HttpStatus;
    message: string | string[];
  } {
    return {
      statusCode:
        exception?.response?.statusCode ??
        exception?.statusCode ??
        HttpStatus.BAD_REQUEST,
      message:
        exception?.response?.message ??
        exception?.response ??
        exception?.message,
    };
  }
}
