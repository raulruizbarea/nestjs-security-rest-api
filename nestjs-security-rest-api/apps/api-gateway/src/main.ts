import * as fs from 'fs';
import * as yaml from 'yaml';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';

import { ApiGatewayModule } from './api-gateway.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule, { bufferLogs: true });

  app.useLogger(app.get(Logger));

  app.use(helmet());

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      //* properties that don't use any validator decorator automatically removed and throw an exception
      whitelist: true,
      forbidNonWhitelisted: true,
      //* transform payload objects to dto
      transform: true,
    }),
  );

  //* API:  /api/v1
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    //*  if you want to have a specific version set as the default version for every controller/route
    defaultVersion: '1',
  });

  const config = new DocumentBuilder()
    .setTitle('NestJS Security REST API')
    .setDescription('Open University of Catalonia')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./open-api.yaml', yaml.stringify(document, {}));

  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get('port');

  await app.listen(port);
}
bootstrap();
