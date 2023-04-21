import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { RpcException } from '@nestjs/microservices';

@Catch()
export class RcpExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const _error = this._getError(exception);

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: _error.statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      info: _error.message,
    });
  }

  _getError(exception: any): { statusCode: HttpStatus; message: string } {
    return {
      statusCode: exception?.statusCode ?? HttpStatus.BAD_REQUEST,
      message: exception?.message,
    };
  }
}
