import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  MemoryHealthIndicator,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';

import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { EnvironmentVariables } from '../config/env.variables';
import { Tags } from '../core/constants/swagger/tags';
import { HealthService } from './health.service';

@ApiTags(Tags.HEALTH)
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly microservice: MicroserviceHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly healthService: HealthService,
  ) {}

  @ApiOperation({
    summary: 'Get the health of the system',
    description: 'Get the health of the system',
  })
  @Get()
  @HealthCheck()
  check(): Promise<HealthCheckResult> {
    return this.health.check([
      () =>
        this.disk.checkStorage('storage', {
          //path: 'C:\\',
          path: '/',
          thresholdPercent: 0.8,
        }),
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024),
      () =>
        this.microservice.pingCheck('university-service', {
          transport: Transport.TCP,
          options: {
            host: this.configService.get('university.host', { infer: true }),
            port: this.configService.get('university.port', { infer: true }),
          },
        }),
    ]);
  }

  @ApiOperation({
    summary: 'Get the health of university service database',
    description: 'Get the health of university service database',
  })
  @Get('university-service')
  @HealthCheck()
  checkUniversityService(): Observable<HealthCheckResult> {
    return this.healthService.check();
  }
}
