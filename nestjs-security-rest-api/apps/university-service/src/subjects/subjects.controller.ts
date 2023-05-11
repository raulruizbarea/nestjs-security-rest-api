import { PageOptionsDto } from '@app/shared/core/dto/page-options.dto';
import { PageDto } from '@app/shared/core/dto/page.dto';
import { SubjectMessagePatternsName } from '@app/shared/subjects/constants/subject-message-patterns-name';
import { CreateSubjectResponseDto } from '@app/shared/subjects/dto/create-subject-response.dto';
import { CreateSubjectDto } from '@app/shared/subjects/dto/create-subject.dto';
import { SubjectResponseDto } from '@app/shared/subjects/dto/subject-response.dto';
import { UpdateSubjectDto } from '@app/shared/subjects/dto/update-subject.dto';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserDto } from 'apps/api-gateway/src/auth/dto/user.dto';
import { Subject } from './entities/subject.entity';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @MessagePattern(SubjectMessagePatternsName.CREATE)
  async create(
    @Payload()
    payload: {
      createSubjectDto: CreateSubjectDto;
      userDto: UserDto;
    },
  ): Promise<CreateSubjectResponseDto> {
    const code: string = await this.subjectsService.create(
      Subject.fromDto(payload.createSubjectDto, payload.userDto),
      payload.userDto,
    );

    return new CreateSubjectResponseDto(code);
  }

  @MessagePattern(SubjectMessagePatternsName.FIND_ONE)
  async findOne(@Payload() payload: string): Promise<SubjectResponseDto> {
    const subject: Subject = await this.subjectsService.findOne(payload);

    return Subject.toDto(subject);
  }

  @MessagePattern(SubjectMessagePatternsName.FIND_ALL)
  async findAll(
    @Payload() payload: PageOptionsDto,
  ): Promise<PageDto<SubjectResponseDto>> {
    const pagedSubjects: PageDto<Subject> = await this.subjectsService.findAll(
      payload,
    );
    const pagedSubjectsResponseDto: PageDto<SubjectResponseDto> = {
      data: pagedSubjects.data.map((subject) => {
        return Subject.toDto(subject);
      }),
      meta: pagedSubjects.meta,
    };

    return pagedSubjectsResponseDto;
  }

  @MessagePattern(SubjectMessagePatternsName.UPDATE)
  async update(
    @Payload()
    payload: {
      code: string;
      updateSubjectDto: UpdateSubjectDto;
      userDto: UserDto;
    },
  ): Promise<number> {
    return await this.subjectsService.update(
      payload.code,
      Subject.fromDto(payload.updateSubjectDto),
      payload.userDto,
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
