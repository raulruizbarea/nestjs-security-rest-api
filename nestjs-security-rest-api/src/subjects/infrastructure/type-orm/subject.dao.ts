import { Column, Entity, PrimaryColumn } from 'typeorm';

import { DbTableNames } from './../../../core/constants/db-table-names';

@Entity(DbTableNames.SUBJECT)
export class SubjectDao {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  surname: string;
}
