import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Languages } from '@app/shared/core/types/languages';
import { TeacherDao } from 'apps/university-service/src/teachers/infrastructure/type-orm/teacher.dao';
import { DbTableNames } from '../../../core/constants/db-table-names';
import { Subject } from '../../entities/subject.entity';

@Entity(DbTableNames.SUBJECT)
export class SubjectDao extends Subject {
  @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  academicalYear: string;

  @Column({ type: 'enum', enum: Languages })
  lang: Languages;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdDate: Date;

  @UpdateDateColumn({ nullable: true, type: 'timestamptz' })
  updatedDate: Date;

  @ManyToMany(() => TeacherDao, (teacher) => teacher.subjects, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinTable({
    name: 'subject_teacher',
    joinColumn: {
      name: 'subject_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'teacher_id',
      referencedColumnName: 'id',
    },
  })
  teachers?: TeacherDao[];
}
