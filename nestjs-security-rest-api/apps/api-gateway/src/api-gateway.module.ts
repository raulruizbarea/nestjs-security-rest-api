import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { SharedModule } from '@app/shared';
import { ClientServices } from '@app/shared/core/constants/client-services';
import { LoggerModule } from 'nestjs-pino';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import configuration from './config/configuration';
import { envSchema } from './config/env.schema';
import { SubjectsModule } from './subjects/subjects.module';
import { HealthModule } from './health/health.module';

@Global()
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
  providers: [ApiGatewayService],
  exports: [ClientsModule],
})
export class ApiGatewayModule {}
