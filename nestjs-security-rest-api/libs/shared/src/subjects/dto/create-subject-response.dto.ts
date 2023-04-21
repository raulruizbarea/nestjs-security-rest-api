import { IsNotEmpty, IsUUID } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateSubjectResponseDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  readonly code: string;

  constructor(code: string) {
    this.code = code;
  }
}
