import * as fs from 'fs';
import * as yaml from 'yaml';

import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule, { bufferLogs: true });
  const configService = app.get(ConfigService);

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

  const schema = configService.get('schema');
  const host = configService.get('host');
  const port = configService.get('port');

  const options = new DocumentBuilder()
    .setTitle('NestJS Security REST API')
    .setDescription('Open University of Catalonia')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access_token',
    )
    .addServer(`${schema}://${host}:${port}`)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  fs.writeFileSync('./open-api.yaml', yaml.stringify(document, {}));

  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
