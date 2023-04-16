import * as ormconfig from './ormconfig';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import configuration from './config/configuration';
import { envSchema } from './config/env.schema';
import { HealthModule } from './health/health.module';
import { SubjectsModule } from './subjects/subjects.module';
import { TeachersModule } from './teachers/teachers.module';
import { UniversityController } from './university.controller';
import { UniversityService } from './university.service';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        pinoHttp: {
          level:
            configService.get('environment') !== 'production'
              ? 'debug'
              : 'info',
          transport:
            configService.get('environment') !== 'production'
              ? {
                  target: 'pino-pretty',
                  options: {
                    //singleLine: true,
                  },
                }
              : undefined,
        },
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
  providers: [UniversityService],
  controllers: [UniversityController],
})
export class UniversityModule {}
