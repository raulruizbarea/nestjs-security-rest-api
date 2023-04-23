import { Languages } from '@app/shared/core/types/languages';
import { CreateSubjectResponseDto } from '@app/shared/subjects/dto/create-subject-response.dto';
import { CreateSubjectDto } from '@app/shared/subjects/dto/create-subject.dto';
import { SubjectResponseDto } from '@app/shared/subjects/dto/subject-response.dto';
import { UpdateSubjectDto } from '@app/shared/subjects/dto/update-subject.dto';
import { SubjectDao } from '../infrastructure/type-orm/subject.dao';

export class Subject {
  readonly createdDate?: Date;
  readonly updatedDate?: Date;

  constructor(
    readonly academicalYear: string,
    readonly code: string,
    readonly lang: Languages,
    readonly name: string,
    readonly description: string,
  ) {}

  static fromDao(subjectDao: SubjectDao): Subject {
    const subject = new Subject(
      subjectDao.academicalYear,
      subjectDao.code,
      subjectDao.lang,
      subjectDao.name,
      subjectDao.description,
    );

    return subject;
  }

  static fromDto(
    createSubjectDto: CreateSubjectDto | UpdateSubjectDto,
  ): Subject {
    const subject = new Subject(
      createSubjectDto.academicalYear,
      createSubjectDto.code,
      createSubjectDto.lang,
      createSubjectDto.name,
      createSubjectDto.description,
    );

    return subject;
  }

  static toDto(subject: Subject): SubjectResponseDto {
    const subjectResponseDto: SubjectResponseDto = new SubjectResponseDto();
    subjectResponseDto.academicalYear = subject.academicalYear;
    subjectResponseDto.code = subject.code;
    subjectResponseDto.lang = subject.lang;
    subjectResponseDto.name = subject.name;
    subjectResponseDto.description = subject.description;

    return subjectResponseDto;
  }

  static toCreateSubjectResponseDto(code: string): CreateSubjectResponseDto {
    return new CreateSubjectResponseDto(code);
  }
}
