import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'The APIs are ready on http://localhost:3000';
  }
}
