import { NestFactory } from '@nestjs/core';
import { SubjectsModule } from './subjects/subjects.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(SubjectsModule);
  // whitelist: true => avoid other properties than the DTO expected
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(3000);
}
bootstrap();
