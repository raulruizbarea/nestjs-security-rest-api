import { Inject, Injectable } from '@nestjs/common';
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
      throw new RpcException(error);
    }
  }

  async findOne(code: string): Promise<Subject> {
    try {
      return await this.subjectsRepository.findOne(code);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findAll(): Promise<Subject[]> {
    try {
      return await this.subjectsRepository.findAll();
    } catch (error) {
      throw new RpcException({ message: error.message });
    }
  }
}
