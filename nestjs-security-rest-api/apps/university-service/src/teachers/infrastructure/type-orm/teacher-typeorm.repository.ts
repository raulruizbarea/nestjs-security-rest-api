import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeachersRepository } from '../../application/teachers.repository';
import { Teacher } from '../../entities/teacher.entity';
import { TeacherDao } from './teacher.dao';

@Injectable()
export class TeacherTypeOrmRepository implements TeachersRepository {
  constructor(
    @InjectRepository(TeacherDao)
    private readonly teacherRepository: Repository<TeacherDao>,
  ) {}

  async create(teacher: Teacher): Promise<string> {
    const createdTeacher: TeacherDao = await this.teacherRepository.create(
      teacher,
    );
    return (await this.teacherRepository.save(createdTeacher)).id;
  }
}
