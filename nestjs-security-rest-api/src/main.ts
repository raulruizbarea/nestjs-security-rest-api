import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SubjectsModule } from './subjects/subjects.module';

async function bootstrap() {
  const app = await NestFactory.create(SubjectsModule);
  // whitelist: true => avoid other properties than the DTO expected
  app.useGlobalPipes(
    new ValidationPipe({
      //* properties that don't use any validator decorator automatically removed and throw an exception
      whitelist: true,
      forbidNonWhitelisted: true,
      //* transform payload objects to dto
      transform: true,
    }),
  );
  await app.listen(3001);
}
bootstrap();
