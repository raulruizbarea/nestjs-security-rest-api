import { RpcException } from '@nestjs/microservices';
import { QueryFailedError } from 'typeorm';

export class QueryFailedException extends RpcException {
  constructor(error: QueryFailedError) {
    switch (error.driverError.code) {
      //TODO: if we don't rephrase it, we give too many information, name of the table, column, pk, fk, and so on.
      case '23502':
        error.message =
          'There are null values in a column that violates not-null contraint.';
        break;
      default:
        error.message = 'Query failed.';
    }
    super(error.message);
  }
}
