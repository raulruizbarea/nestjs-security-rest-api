import { Inject, Injectable } from '@nestjs/common';
import { Subject } from './entities/subject.entity';
import { CreateSubjectResponseDto } from './dto/create-subject-response.dto';
import { SubjectsRepository } from './application/subjects.repository';

@Injectable()
export class SubjectsService {
  constructor(
    @Inject(SubjectsRepository)
    private readonly subjectsRepository: SubjectsRepository,
  ) {}

  async create(subject: Subject): Promise<CreateSubjectResponseDto> {
    // hooks are executed -> validation for createdSubject
    return Subject.toDto(await this.subjectsRepository.create(subject));
  }
}
