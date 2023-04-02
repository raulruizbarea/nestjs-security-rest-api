import { Subject } from '../entities/subject.entity';

export interface SubjectsRepository {
  create(subject: Subject): Promise<Subject>;
}

//TODO: Why Symbol?
export const SubjectsRepository = Symbol('SubjectsRepository');
