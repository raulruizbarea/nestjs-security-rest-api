import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './configuration';
import { envSchema } from './env.schema';
import { EnvironmentVariables } from './env.variables';

@Global()
@Module({
  imports: [
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
  ],
  providers: [ConfigService<EnvironmentVariables>],
})
export class EnvModule {}
