import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectsRepository } from './application/subjects.repository';
import { SubjectTypeOrmRepository } from './infrastructure/type-orm/subject-typeorm.repository';
import { SubjectDao } from './infrastructure/type-orm/subject.dao';
import { SubjectTeacherDao } from './infrastructure/type-orm/subjectteacher.dao';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';

@Module({
  imports: [TypeOrmModule.forFeature([SubjectDao, SubjectTeacherDao])],
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
