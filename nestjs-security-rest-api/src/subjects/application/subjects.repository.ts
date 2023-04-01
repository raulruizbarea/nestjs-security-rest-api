import { Subject } from 'src/subjects/entities/subject.entity';

export interface SubjectsRepository {
  create(subject: Subject): Promise<Subject>;
}

export const SubjectsRepository = Symbol('SubjectsRepository');
