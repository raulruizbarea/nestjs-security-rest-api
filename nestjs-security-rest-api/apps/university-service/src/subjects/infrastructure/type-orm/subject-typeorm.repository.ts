import { APP_EXCEPTION } from '@app/shared/core/constants/app-exception.catalog';
import { PageMetaDto } from '@app/shared/core/dto/page-meta.dto';
import { PageOptionsDto } from '@app/shared/core/dto/page-options.dto';
import { PageDto } from '@app/shared/core/dto/page.dto';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { DbTableNames } from 'apps/university-service/src/core/constants/db-table-names';
import { HttpStatusCode } from 'axios';
import {
  DeleteResult,
  InsertResult,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
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
        message: APP_EXCEPTION.CONFLICT,
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
      .execute()
      .catch((exception) => {
        throw new RpcException({
          message: APP_EXCEPTION.BAD_REQUEST,
          statusCode: HttpStatusCode.BadRequest,
        });
      });

    return insertResult.identifiers[0].id;
  }

  async findOne(code: string): Promise<Subject> {
    const subjectDao: SubjectDao = await this.subjectRepository.findOneBy({
      code: code,
    });

    if (!subjectDao) {
      throw new RpcException({
        message: APP_EXCEPTION.NOT_FOUND,
        statusCode: HttpStatusCode.NotFound,
      });
    }
    return Subject.fromDao(subjectDao);
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Subject>> {
    try {
      const queryResult: SelectQueryBuilder<SubjectDao> =
        await this.subjectRepository
          .createQueryBuilder(DbTableNames.SUBJECT)
          .orderBy('"createdDate"', pageOptionsDto.order)
          .skip(pageOptionsDto.skip)
          .take(pageOptionsDto.take);

      const itemCount = await queryResult.getCount();
      const { entities } = await queryResult.getRawAndEntities();
      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

      const subjects: Subject[] = entities.map((subjectDao) => {
        return Subject.fromDao(subjectDao);
      });

      return new PageDto(subjects, pageMetaDto);
    } catch (error) {
      throw new RpcException({
        message: APP_EXCEPTION.BAD_REQUEST,
        statusCode: HttpStatusCode.BadRequest,
      });
    }
  }

  async update(code: string, subject: Subject): Promise<number> {
    const subjectDao: SubjectDao = await this.subjectRepository.findOneBy({
      code: code,
    });

    if (!subjectDao) {
      throw new RpcException({
        message: APP_EXCEPTION.NOT_FOUND,
        statusCode: HttpStatusCode.NotFound,
      });
    }

    const updateResult: UpdateResult = await this.subjectRepository
      .createQueryBuilder()
      .update(SubjectDao)
      .set(subject)
      .where('code = :code', { code })
      .execute()
      .catch((exception) => {
        throw new RpcException({
          message: APP_EXCEPTION.BAD_REQUEST,
          statusCode: HttpStatusCode.BadRequest,
        });
      });

    if (!updateResult.affected) {
      throw new RpcException({
        message: APP_EXCEPTION.NOT_FOUND,
        statusCode: HttpStatusCode.NotFound,
      });
    }

    return updateResult.affected;
  }

  async delete(code: string): Promise<number> {
    const subjectDao: SubjectDao = await this.subjectRepository.findOneBy({
      code: code,
    });

    if (!subjectDao) {
      throw new RpcException({
        message: APP_EXCEPTION.NOT_FOUND,
        statusCode: HttpStatusCode.NotFound,
      });
    }

    const deleteResult: DeleteResult = await this.subjectRepository.delete({
      code: code,
    });

    if (!deleteResult.affected) {
      throw new RpcException({
        message: APP_EXCEPTION.NOT_FOUND,
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
      .execute()
      .catch((exception) => {
        throw new RpcException({
          message: APP_EXCEPTION.BAD_REQUEST,
          statusCode: HttpStatusCode.BadRequest,
        });
      });

    if (!deleteResult.affected) {
      throw new RpcException({
        message: APP_EXCEPTION.NOT_FOUND,
        statusCode: HttpStatusCode.NotFound,
      });
    }

    return deleteResult.affected;
  }
}
