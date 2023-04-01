import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SubjectsModule } from './subjects/subjects.module';

async function bootstrap() {
  const app = await NestFactory.create(SubjectsModule);
  // whitelist: true => avoid other properties than the DTO expected
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
