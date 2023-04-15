import { ClientServices } from '@app/shared/core/constants/client-services';
import { SubjectMessagePatternsName } from '@app/shared/subjects/constants/subject-message-patterns-name';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class ApiGatewayService {
  constructor(
    @Inject(ClientServices.UNIVERSITY_SERVICE)
    private readonly clientUniversityService: ClientProxy,
  ) {}

  getHello(): Observable<string> {
    const pattern = SubjectMessagePatternsName.HELLO;
    return this.clientUniversityService.send<string>(pattern, {});
  }
}
