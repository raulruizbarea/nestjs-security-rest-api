import { Subject } from '../entities/subject.entity';

export interface SubjectsRepository {
  create(subject: Subject): Promise<string>;
  findOne(code: string): Promise<Subject>;
  findAll(): Promise<Subject[]>;
  update(code: string, subject: Partial<Subject>): Promise<number>;
  delete(code: string): Promise<number>;
  deleteAll(): Promise<number>;
}

export const SubjectsRepository = Symbol('SubjectsRepository');
