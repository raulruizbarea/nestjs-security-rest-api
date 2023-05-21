import * as Sentry from '@sentry/node';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { EnvironmentVariables } from './config/env.variables';
import { nestApplicationOptions } from './nest-application-options';
import { UniversityModule } from './university.module';

async function bootstrap() {
  const app = await NestFactory.create(UniversityModule, {
    ...nestApplicationOptions,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      //* properties that don't use any validator decorator automatically removed and throw an exception
      whitelist: true,
      forbidNonWhitelisted: true,
      //* transform payload objects to dto
      transform: true,
    }),
  );

  const configService = app.get<ConfigService<EnvironmentVariables>>(
    ConfigService<EnvironmentVariables>,
  );
  const port = configService.get('port');
  const universityPort = configService.get('university.port', { infer: true });
  const universityHost = configService.get('university.host', { infer: true });

  Sentry.init({
    dsn: configService.get('sentry.dsn', { infer: true }),
    tracesSampleRate: 1.0,
    environment: configService.get('environment'),
  });

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.TCP,
      options: {
        host: universityHost,
        port: universityPort,
      },
    },
    { inheritAppConfig: true },
  );

  await app.startAllMicroservices();

  await app.listen(port);
}
bootstrap();
