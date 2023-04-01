import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubjectsRepository } from 'src/subjects/application/subjects.repository';
import { Subject } from 'src/subjects/entities/subject.entity';
import { Repository } from 'typeorm';
import { SubjectDao } from './subject.dao';

@Injectable()
export class SubjectTypeOrmRepository implements SubjectsRepository {
  constructor(
    @InjectRepository(SubjectDao)
    private readonly subjectRepository: Repository<SubjectDao>,
  ) {}

  async create(subject: Subject): Promise<Subject> {
    const createdSubject = await this.subjectRepository.create(subject);

    return this.subjectRepository.save(createdSubject);
  }
}
