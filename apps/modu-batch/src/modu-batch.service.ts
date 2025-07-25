import { Injectable } from '@nestjs/common';

@Injectable()
export class ModuBatchService {
  getHello(): string {
    return 'Hello World!';
  }
}
