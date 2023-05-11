import { Languages } from '@app/shared/core/types/languages';
import { CreateSubjectResponseDto } from '@app/shared/subjects/dto/create-subject-response.dto';
import { CreateSubjectDto } from '@app/shared/subjects/dto/create-subject.dto';
import { SubjectResponseDto } from '@app/shared/subjects/dto/subject-response.dto';
import { UpdateSubjectDto } from '@app/shared/subjects/dto/update-subject.dto';
import { UserDto } from 'apps/api-gateway/src/auth/dto/user.dto';
import { SubjectDao } from '../infrastructure/type-orm/subject.dao';

export class Subject {
  readonly createdDate: Date;
  readonly updatedDate: Date;
  readonly createdBy: string;

  constructor(
    readonly academicalYear: string,
    readonly code: string,
    readonly lang: Languages,
    readonly name: string,
    readonly description: string,
    createdBy?: string,
    createdDate?: Date,
    updatedDate?: Date,
  ) {
    this.createdBy = createdBy;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
  }

  static fromDao(subjectDao: SubjectDao): Subject {
    const subject = new Subject(
      subjectDao.academicalYear,
      subjectDao.code,
      subjectDao.lang,
      subjectDao.name,
      subjectDao.description,
      subjectDao.createdBy,
      subjectDao.createdDate,
      subjectDao.updatedDate,
    );

    return subject;
  }

  static fromDto(
    createSubjectDto: CreateSubjectDto | UpdateSubjectDto,
    userDto?: UserDto,
  ): Subject {
    const subject = new Subject(
      createSubjectDto.academicalYear,
      createSubjectDto.code,
      createSubjectDto.lang,
      createSubjectDto.name,
      createSubjectDto.description,
      userDto?.userId,
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
    subjectResponseDto.createdDate = subject.createdDate;
    subjectResponseDto.updatedDate = subject.updatedDate;
    subjectResponseDto.createdBy = subject.createdBy;

    return subjectResponseDto;
  }

  static toCreateSubjectResponseDto(code: string): CreateSubjectResponseDto {
    return new CreateSubjectResponseDto(code);
  }
}
