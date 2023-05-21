import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { EnvModule } from '../config/env.module';
import { EnvironmentVariables } from '../config/env.variables';
import { ThrottlerExceptionFilter } from '../core/filters/throttler-exception.filter';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      imports: [EnvModule],
      inject: [ConfigService<EnvironmentVariables>],
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>,
      ) => ({
        ttl: configService.get('throttle.ttl', { infer: true }),
        limit: configService.get('throttle.limit', { infer: true }),
      }),
    }),
  ],
  providers: [
    ConfigService<EnvironmentVariables>,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: ThrottlerExceptionFilter,
    },
  ],
})
export class ThrottlingModule {}
