import { Injectable } from '@nestjs/common';

@Injectable()
export class UniversityService {
  async getHello(): Promise<string> {
    return 'Hello World from University!';
  }
}
