import { ValidationPipe } from '@nestjs/common';

export class NestApplicationValidationPipe extends ValidationPipe {
  public constructor() {
    super({
      //* properties that don't use any validator decorator automatically removed and throw an exception
      whitelist: true,
      forbidNonWhitelisted: true,
      //* transform payload objects to dto
      transform: true,
    });
  }
}
