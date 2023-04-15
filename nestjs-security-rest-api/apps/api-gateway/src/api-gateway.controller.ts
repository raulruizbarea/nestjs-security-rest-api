import { Controller, Get } from '@nestjs/common';

import { Observable } from 'rxjs';
import { ApiGatewayService } from './api-gateway.service';

@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Get()
  getHello(): Observable<string> {
    return this.apiGatewayService.getHello();
  }
}
