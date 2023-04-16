import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { DbTableNames } from 'apps/university-service/src/core/constants/db-table-names';
import { TeacherDao } from 'apps/university-service/src/teachers/infrastructure/type-orm/teacher.dao';
import { SubjectDao } from './subject.dao';

@Entity(DbTableNames.SUBJECT_TEACHER)
export class SubjectTeacherDao {
  @PrimaryColumn({ name: 'subject_id', type: 'uuid' })
  subjectId: string;

  @PrimaryColumn({ name: 'teacher_id', type: 'uuid' })
  teacherId: string;

  @ManyToOne(() => TeacherDao, (teacher) => teacher.subjects, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'teachers_id', referencedColumnName: 'id' }])
  teachers: TeacherDao[];

  @ManyToOne(() => SubjectDao, (subject) => subject.teachers, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'subject_id', referencedColumnName: 'id' }])
  subjects: SubjectDao[];
}
