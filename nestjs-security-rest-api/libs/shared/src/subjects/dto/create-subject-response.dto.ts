import { IsNotEmpty } from 'class-validator';

export class CreateSubjectResponseDto {
  @IsNotEmpty()
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}
