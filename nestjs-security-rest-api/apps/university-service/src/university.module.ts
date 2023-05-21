import 'winston-daily-rotate-file';

import * as winston from 'winston';
import * as ormconfig from './ormconfig';

import { SharedModule } from '@app/shared';
import winstonConfig from '@app/shared/config/winston-config';
import { MicroServiceExceptionFilter } from '@app/shared/core/filters/microservice-exception.filter';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { EnvModule } from './config/env.module';
import { EnvironmentVariables } from './config/env.variables';
import { HealthModule } from './health/health.module';
import { SubjectsModule } from './subjects/subjects.module';
import { UniversityController } from './university.controller';
import { UniversityService } from './university.service';

const ecsFormat = require('@elastic/ecs-winston-format');

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
            filename: '%DATE%-university-service.log',
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
    TypeOrmModule.forRoot({
      ...ormconfig.default.options,
      autoLoadEntities: true,
    }),
    SubjectsModule,
    SharedModule,
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
