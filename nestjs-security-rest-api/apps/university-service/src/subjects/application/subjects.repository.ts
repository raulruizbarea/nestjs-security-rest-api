import { PageDto } from '@app/shared/core/dto/page.dto';
import { PageOptionsDto } from '@app/shared/core/dto/page-options.dto';
import { Subject } from '../entities/subject.entity';

export interface SubjectsRepository {
  create(subject: Subject): Promise<string>;
  findOne(code: string): Promise<Subject>;
  findAll(pageOptions: PageOptionsDto): Promise<PageDto<Subject>>;
  update(code: string, subject: Subject): Promise<number>;
  delete(code: string): Promise<number>;
  deleteAll(): Promise<number>;
}

export const SubjectsRepository = Symbol('SubjectsRepository');
