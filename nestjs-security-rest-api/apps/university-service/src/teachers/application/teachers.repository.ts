import { Teacher } from '../entities/teacher.entity';

export interface TeachersRepository {
  create(teacher: Teacher): Promise<Teacher>;
}

export const TeachersRepository = Symbol('TeachersRepository');
