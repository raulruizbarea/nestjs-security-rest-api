import * as uuid from 'uuidv6-extension';

import { Column, Entity, PrimaryColumn } from 'typeorm';

import { Subject } from 'src/subjects/entities/subject.entity';
import { DbTableNames } from './../../../core/constants/db-table-names';

//TODO: Why extend entity?
@Entity(DbTableNames.SUBJECT)
export class SubjectDao extends Subject {
  @PrimaryColumn({ type: 'uuid', default: uuid.v6() })
  id: string;

  @Column()
  code: string;

  @Column()
  name: string;
}
