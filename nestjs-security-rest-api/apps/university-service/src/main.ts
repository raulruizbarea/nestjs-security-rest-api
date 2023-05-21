import * as Sentry from '@sentry/node';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { NestApplicationValidationPipe } from '@app/shared/core/pipes/nest-application-validation.pipe';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { EnvironmentVariables } from './config/env.variables';
import { nestApplicationOptions } from './nest-application-options';
import { UniversityModule } from './university.module';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(UniversityModule, {
    ...nestApplicationOptions,
  });

  app.useGlobalPipes(new NestApplicationValidationPipe());

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
