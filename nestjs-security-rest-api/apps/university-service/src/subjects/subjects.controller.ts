import { SubjectMessagePatternsName } from '@app/shared/subjects/constants/subject-message-patterns-name';
import { CreateSubjectResponseDto } from '@app/shared/subjects/dto/create-subject-response.dto';
import { CreateSubjectDto } from '@app/shared/subjects/dto/create-subject.dto';
import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { Subject } from './entities/subject.entity';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  getHello(): string {
    return this.subjectsService.getHello();
  }

  @MessagePattern(SubjectMessagePatternsName.CREATE)
  async create(
    @Payload() payload: CreateSubjectDto,
  ): Promise<CreateSubjectResponseDto> {
    try {
      const id: string = await this.subjectsService.create(
        Subject.fromDto(payload),
      );

      return new CreateSubjectResponseDto(id);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
