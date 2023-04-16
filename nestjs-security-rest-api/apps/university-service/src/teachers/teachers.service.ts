import { Inject, Injectable } from '@nestjs/common';
import { TeachersRepository } from './application/teachers.repository';

@Injectable()
export class TeachersService {
  constructor(
    @Inject(TeachersRepository)
    private readonly teachersRepository: TeachersRepository,
  ) {}

  getHello(): string {
    return 'Hello World from Teachers!';
  }
}
