import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { SharedModule } from '@app/shared';
import { ClientServices } from '@app/shared/core/constants/client-services';
import { APP_FILTER } from '@nestjs/core';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import configuration from './config/configuration';
import { envSchema } from './config/env.schema';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import { RcpExceptionFilter } from './core/filters/rpc-exception.filter';
import { HealthModule } from './health/health.module';
import { SubjectsModule } from './subjects/subjects.module';

@Global()
@Module({
  imports: [
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
export class ApiGatewayModule {}
