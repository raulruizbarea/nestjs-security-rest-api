import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
  imports: [
    TerminusModule.forRoot({
      errorLogStyle: process.env.NODE_ENV === 'production' ? 'json' : 'pretty',
    }),
    HttpModule,
  ],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
