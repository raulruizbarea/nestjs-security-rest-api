import { CreateSubjectResponseDto } from '../dto/create-subject-response.dto';
import { CreateSubjectDto } from '../dto/create-subject.dto';

export class Subject {
  readonly code: string;
  readonly name: string;

  //TODO: implement constructor
  constructor() {}

  static fromDto(subjectDto: CreateSubjectDto): Subject {
    //TODO: call constructor
    const subject = new Subject();

    // if (subjectDto instanceof CreateSubjectDto) {
    //   subject.id = uuid.v6();
    // }
    //TODO: refactor
    //subject.code = subjectDto.code;
    //subject.name = subjectDto.name;

    return subject;
  }

  static toDto(subject: Subject): CreateSubjectResponseDto {
    const createSubjectResponseDto = new CreateSubjectResponseDto();

    //createSubjectResponseDto.id = subject.id;

    return createSubjectResponseDto;
  }
}
