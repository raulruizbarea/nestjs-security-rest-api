import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatusCode } from 'axios';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
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
      throw new RpcException({
        message: 'DUPLICATED CODE',
        statusCode: HttpStatusCode.Conflict,
      });
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
      throw new RpcException({
        message: 'NOT FOUND',
        statusCode: HttpStatusCode.NotFound,
      });
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

  async update(code: string, subject: Subject): Promise<number> {
    const subjectDao: SubjectDao = await this.subjectRepository.findOneBy({
      code: code,
    });

    if (!subjectDao) {
      throw new RpcException({
        message: 'NOT FOUND',
        statusCode: HttpStatusCode.NotFound,
      });
    }

    const updateResult: UpdateResult = await this.subjectRepository.update(
      { code: code },
      subject,
    );

    if (!updateResult.affected) {
      throw new RpcException({
        message: 'NOT FOUND',
        statusCode: HttpStatusCode.NotFound,
      });
    }

    return updateResult.affected;
  }

  async delete(code: string): Promise<number> {
    const deleteResult: DeleteResult = await this.subjectRepository.delete({
      code: code,
    });

    if (!deleteResult.affected) {
      throw new RpcException({
        message: 'NOT FOUND',
        statusCode: HttpStatusCode.NotFound,
      });
    }

    return deleteResult.affected;
  }

  async deleteAll(): Promise<number> {
    const deleteResult: DeleteResult = await this.subjectRepository.delete({});
    return 1;
  }
}
