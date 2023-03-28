import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SubjectDao } from './infrastructure/type-orm/subject.dao';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { CreateSubjectResponseDto } from './dto/create-subject-response.dto';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(SubjectDao)
    private subjectsRepository: Repository<SubjectDao>,
  ) {}

  async create(subject: Subject): Promise<CreateSubjectResponseDto> {
    const createdSubject = await this.subjectsRepository.create(subject);
    // hooks are executed -> validation for createdSubject
    return Subject.toDto(await this.subjectsRepository.save(createdSubject));
  }
}
