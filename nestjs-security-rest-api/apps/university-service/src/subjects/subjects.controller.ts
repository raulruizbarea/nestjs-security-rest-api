import { SubjectMessagePatternsName } from '@app/shared/subjects/constants/subject-message-patterns-name';
import { CreateSubjectResponseDto } from '@app/shared/subjects/dto/create-subject-response.dto';
import { CreateSubjectDto } from '@app/shared/subjects/dto/create-subject.dto';
import { SubjectResponseDto } from '@app/shared/subjects/dto/subject-response.dto';
import { UpdateSubjectDto } from '@app/shared/subjects/dto/update-subject.dto';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Subject } from './entities/subject.entity';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @MessagePattern(SubjectMessagePatternsName.CREATE)
  async create(
    @Payload() payload: CreateSubjectDto,
  ): Promise<CreateSubjectResponseDto> {
    const code: string = await this.subjectsService.create(
      Subject.fromDto(payload),
    );

    return new CreateSubjectResponseDto(code);
  }

  @MessagePattern(SubjectMessagePatternsName.FIND_ONE)
  async findOne(@Payload() payload: string): Promise<SubjectResponseDto> {
    const subject: Subject = await this.subjectsService.findOne(payload);

    return Subject.toDto(subject);
  }

  @MessagePattern(SubjectMessagePatternsName.FIND_ALL)
  async findAll(): Promise<SubjectResponseDto[]> {
    const subjects: Subject[] = await this.subjectsService.findAll();
    const subjectsDto: SubjectResponseDto[] = subjects.map((subject) => {
      return Subject.toDto(subject);
    });

    return subjectsDto;
  }

  @MessagePattern(SubjectMessagePatternsName.UPDATE)
  async update(
    @Payload() payload: { code: string; updateSubjectDto: UpdateSubjectDto },
  ): Promise<number> {
    return await this.subjectsService.update(
      payload.code,
      Subject.fromDto(payload.updateSubjectDto),
    );
  }

  @MessagePattern(SubjectMessagePatternsName.DELETE)
  async delete(@Payload() payload: string): Promise<number> {
    return await this.subjectsService.delete(payload);
  }

  @MessagePattern(SubjectMessagePatternsName.DELETE_ALL)
  async deleteAll(): Promise<number> {
    return await this.subjectsService.deleteAll();
  }
}
