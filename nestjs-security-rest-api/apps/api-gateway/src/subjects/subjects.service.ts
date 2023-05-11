import { ClientServices } from '@app/shared/core/constants/client-services';
import { PageOptionsDto } from '@app/shared/core/dto/page-options.dto';
import { PageDto } from '@app/shared/core/dto/page.dto';
import { SubjectMessagePatternsName } from '@app/shared/subjects/constants/subject-message-patterns-name';
import { CreateSubjectResponseDto } from '@app/shared/subjects/dto/create-subject-response.dto';
import { CreateSubjectDto } from '@app/shared/subjects/dto/create-subject.dto';
import { SubjectResponseDto } from '@app/shared/subjects/dto/subject-response.dto';
import { UpdateSubjectDto } from '@app/shared/subjects/dto/update-subject.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UserDto } from '../auth/dto/user.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @Inject(ClientServices.UNIVERSITY_SERVICE)
    private readonly clientUniversityService: ClientProxy,
  ) {}

  create(
    createSubjectDto: CreateSubjectDto,
    userDto: UserDto,
  ): Observable<CreateSubjectResponseDto> {
    const pattern = SubjectMessagePatternsName.CREATE;
    const payload = {
      createSubjectDto,
      userDto,
    };
    return this.clientUniversityService.send<CreateSubjectResponseDto>(
      pattern,
      payload,
    );
  }

  findOne(code: string): Observable<SubjectResponseDto> {
    const pattern = SubjectMessagePatternsName.FIND_ONE;
    const payload: string = code;
    return this.clientUniversityService.send<SubjectResponseDto>(
      pattern,
      payload,
    );
  }

  findAll(pageDto: PageOptionsDto): Observable<PageDto<SubjectResponseDto>> {
    const pattern = SubjectMessagePatternsName.FIND_ALL;
    const payload: PageOptionsDto = pageDto;

    return this.clientUniversityService.send<PageDto<SubjectResponseDto>>(
      pattern,
      payload,
    );
  }

  update(
    code: string,
    updateSubjectDto: UpdateSubjectDto,
    userDto: UserDto,
  ): Observable<number> {
    const pattern = SubjectMessagePatternsName.UPDATE;
    const payload = {
      code,
      updateSubjectDto,
      userDto,
    };

    return this.clientUniversityService.send<number>(pattern, payload);
  }

  remove(code: string): Observable<number> {
    const pattern = SubjectMessagePatternsName.DELETE;
    const payload: string = code;

    return this.clientUniversityService.send<number>(pattern, payload);
  }

  removeAll(): Observable<number> {
    const pattern = SubjectMessagePatternsName.DELETE_ALL;

    return this.clientUniversityService.send<number>(pattern, {});
  }
}
