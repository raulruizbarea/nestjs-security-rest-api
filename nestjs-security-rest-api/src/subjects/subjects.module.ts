import * as ormconfig from './../ormconfig';

import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { SubjectDao } from './infrastructure/type-orm/subject.dao';
import { SubjectTypeOrmRepository } from './infrastructure/type-orm/subject-typeorm.repository';
import { SubjectsController } from './subjects.controller';
import { SubjectsRepository } from './application/subjects.repository';
import { SubjectsService } from './subjects.service';
import { TypeOrmModule } from '@nestjs/typeorm';

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
