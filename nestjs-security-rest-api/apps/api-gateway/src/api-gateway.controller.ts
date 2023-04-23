import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Tags } from './core/constants/swagger/tags';

@ApiTags(Tags.ROOT)
@Controller()
export class ApiGatewayController {}
