import { SubjectMessagePatternsName } from '@app/shared/subjects/constants/subject-message-patterns-name';
import { CreateSubjectResponseDto } from '@app/shared/subjects/dto/create-subject-response.dto';
import { CreateSubjectDto } from '@app/shared/subjects/dto/create-subject.dto';
import { SubjectResponseDto } from '@app/shared/subjects/dto/subject-response.dto';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { Subject } from './entities/subject.entity';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @MessagePattern(SubjectMessagePatternsName.CREATE)
  async create(
    @Payload() payload: CreateSubjectDto,
  ): Promise<CreateSubjectResponseDto> {
    const id: string = await this.subjectsService.create(
      Subject.fromDto(payload),
    );

    return new CreateSubjectResponseDto(id);
  }

  @MessagePattern(SubjectMessagePatternsName.FIND_ONE)
  async findOne(@Payload() payload: string): Promise<SubjectResponseDto> {
    try {
      const subject: Subject = await this.subjectsService.findOne(payload);
      return Subject.toDto(subject);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @MessagePattern(SubjectMessagePatternsName.FIND_ALL)
  async findAll(): Promise<SubjectResponseDto[]> {
    try {
      const subjects: Subject[] = await this.subjectsService.findAll();
      const subjectsDto: SubjectResponseDto[] = subjects.map((subject) => {
        return Subject.toDto(subject);
      });
      return subjectsDto;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
