import { Body, Post } from '@nestjs/common/decorators';
import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { SubjectsService } from './subjects.service';
import { Subject } from './entities/subject.entity';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  //TODO: Why not async?
  @Post()
  create(@Body() body: CreateSubjectDto) {
    try {
      return this.subjectsService.create(Subject.fromDto(body));
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
