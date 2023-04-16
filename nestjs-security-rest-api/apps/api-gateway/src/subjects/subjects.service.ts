import { ClientServices } from '@app/shared/core/constants/client-services';
import { SubjectMessagePatternsName } from '@app/shared/subjects/constants/subject-message-patterns-name';
import { CreateSubjectResponseDto } from '@app/shared/subjects/dto/create-subject-response.dto';
import { CreateSubjectDto } from '@app/shared/subjects/dto/create-subject.dto';
import { SubjectResponseDto } from '@app/shared/subjects/dto/subject-response.dto';
import { UpdateSubjectDto } from '@app/shared/subjects/dto/update-subject.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class SubjectsService {
  constructor(
    @Inject(ClientServices.UNIVERSITY_SERVICE)
    private readonly clientUniversityService: ClientProxy,
  ) {}

  create(
    createSubjectDto: CreateSubjectDto,
  ): Observable<CreateSubjectResponseDto> {
    const pattern = SubjectMessagePatternsName.CREATE;
    const payload: CreateSubjectDto = createSubjectDto;
    return this.clientUniversityService.send<CreateSubjectResponseDto>(
      pattern,
      payload,
    );
  }

  findOne(id: string): Observable<SubjectResponseDto> {
    const pattern = SubjectMessagePatternsName.FIND_ONE;
    const payload: string = id;
    return this.clientUniversityService.send<SubjectResponseDto>(
      pattern,
      payload,
    );
  }

  findAll(): Observable<SubjectResponseDto[]> {
    const pattern = SubjectMessagePatternsName.FIND_ALL;

    return this.clientUniversityService.send<SubjectResponseDto[]>(pattern, {});
  }

  update(id: string, updateSubjectDto: UpdateSubjectDto): void {}

  remove(id: string): void {}
}
