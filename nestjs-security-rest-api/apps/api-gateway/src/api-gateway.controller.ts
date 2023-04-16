import { Controller } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { ApiGatewayService } from './api-gateway.service';
import { Tags } from './core/constants/swagger/tags';

@ApiTags(Tags.ROOT)
@Controller()
export class ApiGatewayController {
  constructor(private readonly apiGatewayService: ApiGatewayService) {}
}
