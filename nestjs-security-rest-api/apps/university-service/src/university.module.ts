import * as ormconfig from './ormconfig';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { SharedModule } from '@app/shared';
import winstonConfig from '@app/shared/config/winston-config';
import { MicroServiceExceptionFilter } from '@app/shared/core/exceptions/microservice-exception.filter';
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SentryModule } from '@ntegral/nestjs-sentry';
import { WinstonModule } from 'nest-winston';
import configuration from './config/configuration';
import { envSchema } from './config/env.schema';
import { HealthModule } from './health/health.module';
import { SubjectsModule } from './subjects/subjects.module';
import { TeachersModule } from './teachers/teachers.module';
import { UniversityController } from './university.controller';
import { UniversityService } from './university.service';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        ...winstonConfig,
        defaultMeta: { service: { name: configService.get('name') } },
      }),
      inject: [ConfigService],
    }),
    SentryModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        dsn: configService.get('sentry.dsn'),
        environment: configService.get('environment'),
        tracesSampleRate: 1.0,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: [
        `apps/university-service/src/environments/.env.${process.env.NODE_ENV}`,
      ],
      validationSchema: envSchema,
      validationOptions: {
        abortEarly: true,
        allowUnknown: false,
        stripUnknown: true,
      },
    }),
    TypeOrmModule.forRoot({
      ...ormconfig.default.options,
      autoLoadEntities: true,
    }),
    SubjectsModule,
    SharedModule,
    TeachersModule,
    HealthModule,
  ],
  providers: [
    UniversityService,
    {
      provide: APP_FILTER,
      useClass: MicroServiceExceptionFilter,
    },
  ],
  controllers: [UniversityController],
})
export class UniversityModule {}
