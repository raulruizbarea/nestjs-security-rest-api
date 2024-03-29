import { SubjectMessagePatternsName } from '@app/shared/subjects/constants/subject-message-patterns-name';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UniversityService } from './university.service';

@Controller()
export class UniversityController {
  constructor(private readonly universityService: UniversityService) {}

  @MessagePattern(SubjectMessagePatternsName.HELLO)
  getHello(): string {
    return this.universityService.getHello();
  }
}
