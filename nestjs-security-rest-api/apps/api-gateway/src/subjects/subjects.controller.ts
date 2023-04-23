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
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Sanitizer, sanitize } from 'class-sanitizer';
import { Observable } from 'rxjs';
import { Tags } from '../core/constants/swagger/tags';
import { SubjectsService } from './subjects.service';

@ApiTags(Tags.SUBJECTS)
@ApiBearerAuth('access-token')
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
      sanitize(createSubjectDto);

      return this.subjectsService.create(createSubjectDto);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @ApiOperation({
    summary: 'Find a subject by code',
    description: 'Find a subject by code',
  })
  @ApiParam({
    name: 'code',
    required: true,
  })
  @ApiOkResponse({
    description: 'The subject has been found.',
    type: SubjectResponseDto,
  })
  @Get(':code')
  findOne(@Param('code') code: string): Observable<SubjectResponseDto> {
    code = Sanitizer.escape(code).trim();

    return this.subjectsService.findOne(code);
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
    summary: 'Update a subject by code',
    description: 'Update a subject by code',
  })
  @Patch(':code')
  update(
    @Param('code') code: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ): Observable<number> {
    // if (Object.values(updateSubjectDto).some((value) => value === null)) {
    //   throw new HttpException(
    //     'updateSubjectDto cannot contain null values',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
    code = Sanitizer.escape(code).trim();
    sanitize(updateSubjectDto);

    return this.subjectsService.update(code, updateSubjectDto);
  }

  @ApiOperation({
    summary: 'Delete a subject by code',
    description: 'Delete a subject by code',
  })
  @Delete(':code')
  remove(@Param('code') code: string): Observable<number> {
    code = Sanitizer.escape(code).trim();

    return this.subjectsService.remove(code);
  }

  @ApiOperation({
    summary: 'Delete all subjects',
    description: 'Delete all subjects',
  })
  @Delete()
  removeAll(): Observable<number> {
    return this.subjectsService.removeAll();
  }
}
