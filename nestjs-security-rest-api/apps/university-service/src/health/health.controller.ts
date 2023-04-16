import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';

import { HealthMessagePatternsName } from '@app/shared/health/constants/health-message-patterns-name';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
  ) {}

  @MessagePattern(HealthMessagePatternsName.HEALTH)
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    try {
      await this.db.pingCheck('database');
    } catch (err) {
      const result = {
        status: 'error',
      } as HealthCheckResult;

      result.error = {
        ...err.causes,
      };
      result.error.database = {
        ...result.error.database,
        message: err.message,
      };
      result.details = { ...result.error };
      return result;
    }

    return this.health.check([() => this.db.pingCheck('database')]);
  }
}
