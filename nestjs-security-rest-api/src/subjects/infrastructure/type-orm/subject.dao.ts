import * as uuid from 'uuidv6-extension';

import { Column, Entity, PrimaryColumn } from 'typeorm';

import { DbTableNames } from './../../../core/constants/db-table-names';
import { Subject } from 'src/subjects/entities/subject.entity';

@Entity(DbTableNames.SUBJECT)
export class SubjectDao extends Subject {
  @PrimaryColumn({ type: 'uuid', default: uuid.v6() })
  id: string;

  @Column()
  code: string;

  @Column()
  name: string;
}
