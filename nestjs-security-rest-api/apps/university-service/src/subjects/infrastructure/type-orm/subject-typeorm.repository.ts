import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatusCode } from 'axios';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
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

    const insertResult: InsertResult = await this.subjectRepository
      .createQueryBuilder()
      .insert()
      .into(SubjectDao)
      .values(createdSubjectDao)
      .execute();

    return insertResult.identifiers[0].id;
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

    const updateResult: UpdateResult = await this.subjectRepository
      .createQueryBuilder()
      .update(SubjectDao)
      .set(subject)
      .where('code = :code', { code })
      .execute();

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
    const deleteResult: DeleteResult = await this.subjectRepository
      .createQueryBuilder()
      .delete()
      .from(SubjectDao)
      .execute();

    if (!deleteResult.affected) {
      throw new RpcException({
        message: 'NOT FOUND',
        statusCode: HttpStatusCode.NotFound,
      });
    }

    return deleteResult.affected;
  }
}
