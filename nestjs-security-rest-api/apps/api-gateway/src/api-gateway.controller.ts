import { Controller, Get } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { ApiGatewayService } from './api-gateway.service';
import { Tags } from './core/constants/swagger/tags';

@ApiTags(Tags.ROOT)
@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}

  @Get()
  getHello(): Observable<string> {
    return this.apiGatewayService.getHello();
  }
}
