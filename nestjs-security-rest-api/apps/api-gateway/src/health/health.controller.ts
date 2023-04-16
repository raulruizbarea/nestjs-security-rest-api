import { Controller, Get } from '@nestjs/common';
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
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
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
    private readonly configService: ConfigService,
    private readonly healthService: HealthService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () =>
        this.disk.checkStorage('storage', {
          path: 'C:\\',
          thresholdPercent: 0.8,
        }),
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () =>
        this.microservice.pingCheck('university-service', {
          transport: Transport.TCP,
          options: {
            host: this.configService.get('university.host'),
            port: this.configService.get('university.port'),
          },
        }),
    ]);
  }

  @Get('university-service')
  checkUniversityService(): Observable<HealthCheckResult> {
    return this.healthService.check();
  }
}
