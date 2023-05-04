import { PageOptionsDto } from '@app/shared/core/dto/page-options.dto';
import { PageDto } from '@app/shared/core/dto/page.dto';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { SubjectsRepository } from './application/subjects.repository';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @Inject(SubjectsRepository)
    private readonly subjectsRepository: SubjectsRepository,
  ) {}

  async create(subject: Subject): Promise<string> {
    try {
      return await this.subjectsRepository.create(subject);
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: error.error?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async findOne(code: string): Promise<Subject> {
    try {
      return await this.subjectsRepository.findOne(code);
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: error.error?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async findAll(pageOptions: PageOptionsDto): Promise<PageDto<Subject>> {
    try {
      return await this.subjectsRepository.findAll(pageOptions);
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: error.error?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async update(code: string, subject: Subject): Promise<number> {
    try {
      return await this.subjectsRepository.update(code, subject);
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: error.error?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async delete(code: string): Promise<number> {
    try {
      return await this.subjectsRepository.delete(code);
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: error.error?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async deleteAll(): Promise<number> {
    try {
      return await this.subjectsRepository.deleteAll();
    } catch (error) {
      throw new RpcException({
        message: error.message,
        statusCode: error.error?.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
