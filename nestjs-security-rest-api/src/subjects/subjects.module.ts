import * as ormconfig from './../ormconfig';

import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { SubjectDao } from './infrastructure/type-orm/subject.dao';
import { SubjectsController } from './subjects.controller';
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
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([SubjectDao]),
  ],
  controllers: [SubjectsController],
  providers: [SubjectsService],
})
export class SubjectsModule {
  constructor() {}
}
