import { CreateSubjectResponseDto } from '@app/shared/subjects/dto/create-subject-response.dto';
import { CreateSubjectDto } from '@app/shared/subjects/dto/create-subject.dto';
import { SubjectResponseDto } from '@app/shared/subjects/dto/subject-response.dto';
import { UpdateSubjectDto } from '@app/shared/subjects/dto/update-subject.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { isUUID } from 'class-validator';
import { Observable } from 'rxjs';
import { Tags } from '../core/constants/swagger/tags';
import { SubjectsService } from './subjects.service';

@ApiTags(Tags.SUBJECTS)
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @ApiOperation({
    summary: 'Create a new subject',
    description: 'Create a new subject',
  })
  @ApiBody({
    type: CreateSubjectDto,
    required: true,
  })
  @ApiCreatedResponse({
    description: 'The subject has been successfully created.',
    type: CreateSubjectResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error.',
  })
  @Post()
  create(
    @Body() createSubjectDto: CreateSubjectDto,
  ): Observable<CreateSubjectResponseDto> {
    try {
      return this.subjectsService.create(createSubjectDto);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({
    summary: 'Find a subject by id',
    description: 'Find a subject by id',
  })
  @ApiParam({
    name: 'id',
    required: true,
  })
  @ApiOkResponse({
    description: 'The subject has been found.',
    type: SubjectResponseDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string): Observable<SubjectResponseDto> {
    if (!isUUID(id)) {
      throw new HttpException('Id must be UUID', HttpStatus.BAD_REQUEST);
    }

    return this.subjectsService.findOne(id);
  }

  @ApiOperation({
    summary: 'Find all subjects',
    description: 'Find all subjects',
  })
  @ApiOkResponse({
    description: 'The subject has been found.',
    type: SubjectResponseDto,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.subjectsService.findAll();
  }

  @ApiOperation({
    summary: 'Update a subject by id',
    description: 'Update a subject by id',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ): void {
    return this.subjectsService.update(id, updateSubjectDto);
  }

  @ApiOperation({
    summary: 'Delete a subject by id',
    description: 'Delete a subject by id',
  })
  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.subjectsService.remove(id);
  }
}
