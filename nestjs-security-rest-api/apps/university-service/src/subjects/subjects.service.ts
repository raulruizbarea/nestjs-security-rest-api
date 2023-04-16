import { Inject, Injectable } from '@nestjs/common';
import { SubjectsRepository } from './application/subjects.repository';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @Inject(SubjectsRepository)
    private readonly subjectsRepository: SubjectsRepository,
  ) {}

  async create(subject: Subject): Promise<string> {
    return await this.subjectsRepository.create(subject);
  }

  async findOne(id: string): Promise<Subject> {
    return await this.subjectsRepository.findOne(id);
  }

  async findAll(): Promise<Subject[]> {
    return await this.subjectsRepository.findAll();
  }
}
