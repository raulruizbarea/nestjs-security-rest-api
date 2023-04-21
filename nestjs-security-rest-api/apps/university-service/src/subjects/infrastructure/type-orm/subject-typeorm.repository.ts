import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
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
    const subjectDao: SubjectDao = await this.subjectRepository.findOneBy({
      code: subject.code,
    });

    if (subjectDao) {
      throw new RpcException('DUPLICATED CODE');
    }

    const createdSubjectDao: SubjectDao = await this.subjectRepository.create(
      subject,
    );

    return (await this.subjectRepository.save(createdSubjectDao)).code;
  }

  async findOne(code: string): Promise<Subject> {
    const subjectDao: SubjectDao = await this.subjectRepository.findOneBy({
      code: code,
    });
    if (!subjectDao) {
      throw new RpcException('NOT FOUND');
    }
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
