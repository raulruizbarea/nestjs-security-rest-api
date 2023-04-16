import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachersRepository } from './application/teachers.repository';
import { TeacherTypeOrmRepository } from './infrastructure/type-orm/teacher-typeorm.repository';
import { TeacherDao } from './infrastructure/type-orm/teacher.dao';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherDao])],
  controllers: [TeachersController],
  providers: [
    TeachersService,
    {
      provide: TeachersRepository,
      useClass: TeacherTypeOrmRepository,
    },
  ],
})
export class TeachersModule {}
