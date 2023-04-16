import { ClientServices } from '@app/shared/core/constants/client-services';
import { HealthMessagePatternsName } from '@app/shared/health/constants/health-message-patterns-name';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { HealthCheckResult } from '@nestjs/terminus';
import { Observable } from 'rxjs';

@Injectable()
export class HealthService {
  constructor(
    @Inject(ClientServices.UNIVERSITY_SERVICE)
    private readonly clientUniversityService: ClientProxy,
  ) {}

  check(): Observable<HealthCheckResult> {
    const pattern = HealthMessagePatternsName.HEALTH;
    return this.clientUniversityService.send<HealthCheckResult>(pattern, {});
  }
}
