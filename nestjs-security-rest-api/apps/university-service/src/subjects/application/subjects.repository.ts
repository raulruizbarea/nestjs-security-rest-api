import { Subject } from '../entities/subject.entity';

export interface SubjectsRepository {
  create(subject: Subject): Promise<string>;
  findOne(id: string): Promise<Subject>;
  findAll(): Promise<Subject[]>;
}

export const SubjectsRepository = Symbol('SubjectsRepository');
