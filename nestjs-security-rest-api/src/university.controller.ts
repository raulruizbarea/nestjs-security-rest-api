import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UniversityService } from './university.service';

@Controller()
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @MessagePattern('getHello')
  getHello(): Promise<string> {
    return this.universityService.getHello();
  }
}
