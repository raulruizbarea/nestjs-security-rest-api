import { Injectable } from '@nestjs/common';

@Injectable()
export class UniversityService {
  getHello(): string {
    return 'Hello World from University!';
  }
}
