import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateSubjectResponseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly code: string;

  constructor(code: string) {
    this.code = code;
  }
}
