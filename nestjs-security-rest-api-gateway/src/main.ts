import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  app.useGlobalPipes(
    new ValidationPipe({
      //* properties that don't use any validator decorator automatically removed and throw an exception
      whitelist: true,
      forbidNonWhitelisted: true,
      //* transform payload objects to dto
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('NestJS Security REST API')
    .setDescription('Open University of Catalonia')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
