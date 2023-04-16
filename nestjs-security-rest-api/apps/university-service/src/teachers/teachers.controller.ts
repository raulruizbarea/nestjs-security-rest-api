import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';

import { TeachersService } from './teachers.service';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get()
  getHello(): string {
    return this.teachersService.getHello();
  }
}
