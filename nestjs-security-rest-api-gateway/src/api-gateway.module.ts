import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import configuration from './config/configuration';
import { envSchema } from './config/env.schema';

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
      envFilePath: [`src/environments/.env.${process.env.NODE_ENV}`],
      validationSchema: envSchema,
      validationOptions: {
        abortEarly: true,
        allowUnknown: false,
        stripUnknown: true,
      },
    }),
    ClientsModule.registerAsync([
      {
        name: 'UniversityService',
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
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
