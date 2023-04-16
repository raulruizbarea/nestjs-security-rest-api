import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MicroserviceHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { Tags } from '../core/constants/swagger/tags';

@ApiTags(Tags.HEALTH)
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private http: HttpHealthIndicator,
    private microservice: MicroserviceHealthIndicator,
    private configService: ConfigService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      //() => this.http.pingCheck('api-gateway', 'http://localhost:3000'),
      // () =>
      //   this.db.pingCheck('database', {
      //     connection: this.universityServiceConnection,
      //   }),
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
}
