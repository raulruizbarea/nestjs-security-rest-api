import * as ormconfig from './../ormconfig';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectsRepository } from './application/subjects.repository';
import { SubjectTypeOrmRepository } from './infrastructure/type-orm/subject-typeorm.repository';
import { SubjectDao } from './infrastructure/type-orm/subject.dao';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`src/environments/.env.${process.env.NODE_ENV}`],
    }),
    TypeOrmModule.forRoot({
      ...ormconfig.default.options,
      autoLoadEntities: false,
    }),
    TypeOrmModule.forFeature([SubjectDao]),
  ],
  controllers: [SubjectsController],
  providers: [
    SubjectsService,
    {
      provide: SubjectsRepository,
      useClass: SubjectTypeOrmRepository,
    },
  ],
})
export class SubjectsModule {
  constructor() {}
}
