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

  async findOne(id: string): Promise<Subject> {
    const subjectDao: SubjectDao = await this.subjectRepository.findOneBy({
      id: id,
    });
    return Subject.fromDao(subjectDao);
  }

  async findAll(): Promise<Subject[]> {
    const subjectsDao: SubjectDao[] = await this.subjectRepository.find();

    const subjects: Subject[] = subjectsDao.map((subjectDao) => {
      return Subject.fromDao(subjectDao);
    });
    return subjects;
  }
}
