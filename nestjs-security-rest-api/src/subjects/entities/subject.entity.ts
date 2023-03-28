import * as uuid from 'uuidv6-extension';

import { CreateSubjectDto } from '../dto/create-subject.dto';
import { CreateSubjectResponseDto } from '../dto/create-subject-response.dto';

export class Subject {
  //TODO: readonly y constructor? cuándo?
  id: string;
  code: string;
  name: string;

  static fromDto(subjectDto: CreateSubjectDto): Subject {
    const subject = new Subject();

    if (subjectDto instanceof CreateSubjectDto) {
      subject.id = uuid.v6();
    }
    subject.code = subjectDto.code;
    subject.name = subjectDto.name;

    return subject;
  }

  static toDto(subject: Subject): CreateSubjectResponseDto {
    const createSubjectResponseDto = new CreateSubjectResponseDto();

    createSubjectResponseDto.id = subject.id;

    return createSubjectResponseDto;
  }
}
