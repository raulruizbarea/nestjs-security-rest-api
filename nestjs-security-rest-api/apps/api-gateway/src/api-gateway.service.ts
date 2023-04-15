import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class ApiGatewayService {
  constructor(
    @Inject('UniversityService')
    private readonly clientUniversityService: ClientProxy,
  ) {}

  getHello(): Observable<string> {
    const pattern = 'getHello';
    return this.clientUniversityService.send<string>(pattern, {});
  }
}
