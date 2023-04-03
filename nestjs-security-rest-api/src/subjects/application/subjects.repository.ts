import { Subject } from '../entities/subject.entity';

export interface SubjectsRepository {
  create(subject: Subject): Promise<Subject>;
}

export const SubjectsRepository = Symbol('SubjectsRepository');
