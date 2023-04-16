import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { SubjectDao } from 'apps/university-service/src/subjects/infrastructure/type-orm/subject.dao';
import { DbTableNames } from '../../../core/constants/db-table-names';
import { Teacher } from '../../entities/teacher.entity';

@Entity(DbTableNames.TEACHER)
export class TeacherDao extends Teacher {
  @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
  id: string;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdDate: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamptz' })
  updatedDate: Date;

  @ManyToMany(
    () => SubjectDao,
    (subject) => subject.teachers, //optional
    { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' },
  )
  subjects?: SubjectDao[];
}
