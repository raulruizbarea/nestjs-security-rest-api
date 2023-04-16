import { Inject, Injectable } from '@nestjs/common';
import { SubjectsRepository } from './application/subjects.repository';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @Inject(SubjectsRepository)
    private readonly subjectsRepository: SubjectsRepository,
  ) {}

  getHello(): string {
    return 'Hello World from Subjects!';
  }

  async create(subject: Subject): Promise<string> {
    return await this.subjectsRepository.create(subject);
  }
}
