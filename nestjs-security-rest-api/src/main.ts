import { NestFactory } from '@nestjs/core';
import { SubjectsModule } from './subjects/subjects.module';

async function bootstrap() {
  const app = await NestFactory.create(SubjectsModule);
  await app.listen(3000);
}
bootstrap();
