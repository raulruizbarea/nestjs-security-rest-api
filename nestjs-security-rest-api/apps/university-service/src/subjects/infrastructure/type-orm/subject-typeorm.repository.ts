import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubjectsRepository } from '../../application/subjects.repository';
import { Subject } from '../../entities/subject.entity';
import { SubjectDao } from './subject.dao';

@Injectable()
export class SubjectTypeOrmRepository implements SubjectsRepository {
  constructor(
    @InjectRepository(SubjectDao)
    private readonly subjectRepository: Repository<SubjectDao>,
  ) {}

  async create(subject: Subject): Promise<string> {
    const createdSubject: SubjectDao = await this.subjectRepository.create(
      subject,
    );
    return (await this.subjectRepository.save(createdSubject)).id;
  }
}
