import { IsDate, IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { CreateSubjectDto } from './create-subject.dto';

export class SubjectResponseDto extends CreateSubjectDto {
  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  createdDate: Date;
  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  updatedDate: Date;
}
