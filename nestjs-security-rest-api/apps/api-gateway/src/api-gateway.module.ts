import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { SharedModule } from '@app/shared';
import winstonConfig from '@app/shared/config/winston-config';
import { ClientServices } from '@app/shared/core/constants/client-services';
import { LoggerMiddleware } from '@app/shared/core/middlewares/logger.middleware';
import { APP_FILTER } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import configuration from './config/configuration';
import { envSchema } from './config/env.schema';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import { RcpExceptionFilter } from './core/filters/rpc-exception.filter';
import { HealthModule } from './health/health.module';
import { SubjectsModule } from './subjects/subjects.module';

const Sentry = require('winston-transport-sentry-node').default;
const winston = require('winston');

@Global()
@Module({
  imports: [
    WinstonModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        ...winstonConfig,
        transports: [
          ...winstonConfig.transports,
          new Sentry({
            serverName: configService.get('name'),
            sentry: {
              dsn: configService.get('sentry.dsn'),
              environment: configService.get('environment'),
              tracesSampleRate: 1.0,
            },
            level: 'error',
            format: winston.format.json(),
          }),
        ],
        defaultMeta: { service: { name: configService.get('name') } },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      //* ignoreEnvFile: true,
      envFilePath: [
        `apps/api-gateway/src/environments/.env.${process.env.NODE_ENV}`,
      ],
      validationSchema: envSchema,
      validationOptions: {
        abortEarly: true,
        allowUnknown: false,
        stripUnknown: true,
      },
    }),
    ClientsModule.registerAsync([
      {
        name: ClientServices.UNIVERSITY_SERVICE,
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('university.host'),
            port: configService.get('university.port'),
          },
        }),
      },
    ]),
    SharedModule,
    SubjectsModule,
    HealthModule,
  ],
  controllers: [ApiGatewayController],
  providers: [
    ApiGatewayService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: RcpExceptionFilter,
    },
  ],
  exports: [ClientsModule],
})
export class ApiGatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
