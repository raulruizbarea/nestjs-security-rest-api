import 'winston-daily-rotate-file';

import * as winston from 'winston';

import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { SharedModule } from '@app/shared';
import winstonConfig from '@app/shared/config/winston-config';
import { ClientServices } from '@app/shared/core/constants/client-services';
import { LoggerMiddleware } from '@app/shared/core/middlewares/logger.middleware';
import { WinstonModule } from 'nest-winston';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { AuthModule } from './auth/auth.module';
import { EnvModule } from './config/env.module';
import { EnvironmentVariables } from './config/env.variables';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import { RcpExceptionFilter } from './core/filters/rpc-exception.filter';
import { ThrottlerExceptionFilter } from './core/filters/throttler-exception.filter';
import { HealthModule } from './health/health.module';
import { SubjectsModule } from './subjects/subjects.module';

const ecsFormat = require('@elastic/ecs-winston-format');

@Global()
@Module({
  imports: [
    EnvModule,
    WinstonModule.forRootAsync({
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>,
      ) => ({
        ...winstonConfig,
        transports: [
          ...winstonConfig.transports,
          new winston.transports.DailyRotateFile({
            filename: '%DATE%-api-gateway.log',
            dirname: './logs',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxFiles: '30d',
            format: ecsFormat({ convertReqRes: true }),
            level: 'http',
          }),
        ],
        defaultMeta: { service: { name: configService.get('name') } },
      }),
      inject: [ConfigService],
    }),

    ClientsModule.registerAsync([
      {
        name: ClientServices.UNIVERSITY_SERVICE,
        inject: [ConfigService],
        useFactory: async (
          configService: ConfigService<EnvironmentVariables>,
        ) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('university.host', { infer: true }),
            port: configService.get('university.port', { infer: true }),
          },
        }),
      },
    ]),
    SharedModule,
    AuthModule,
    HealthModule,
    SubjectsModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>,
      ) => ({
        ttl: configService.get('throttle.ttl', { infer: true }),
        limit: configService.get('throttle.limit', { infer: true }),
      }),
    }),
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
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: ThrottlerExceptionFilter,
    },
  ],
  exports: [ClientsModule],
})
export class ApiGatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
