import { Languages } from '@app/shared/core/types/languages';
import { CreateSubjectResponseDto } from '@app/shared/subjects/dto/create-subject-response.dto';
import { CreateSubjectDto } from '@app/shared/subjects/dto/create-subject.dto';

export class Subject {
  readonly id?: string;
  readonly createdDate?: Date;
  updatedDate?: Date;

  constructor(
    readonly academicalYear: string,
    readonly code: number,
    readonly lang: Languages,
    readonly name: string,
    readonly description: string,
  ) {}

  static fromDto(createSubjectDto: CreateSubjectDto): Subject {
    const subject = new Subject(
      createSubjectDto.academicalYear,
      createSubjectDto.code,
      createSubjectDto.lang,
      createSubjectDto.name,
      createSubjectDto.description,
    );

    return subject;
  }

  static toCreateSubjectResponseDto(id: string): CreateSubjectResponseDto {
    return new CreateSubjectResponseDto(id);
  }
}
