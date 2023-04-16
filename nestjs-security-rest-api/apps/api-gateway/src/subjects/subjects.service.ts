import { ClientServices } from '@app/shared/core/constants/client-services';
import { SubjectMessagePatternsName } from '@app/shared/subjects/constants/subject-message-patterns-name';
import { CreateSubjectResponseDto } from '@app/shared/subjects/dto/create-subject-response.dto';
import { CreateSubjectDto } from '@app/shared/subjects/dto/create-subject.dto';
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
}
