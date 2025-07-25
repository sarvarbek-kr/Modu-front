import { Controller, Get } from '@nestjs/common';
import { ModuBatchService } from './modu-batch.service';

@Controller()
export class ModuBatchController {
  constructor(private readonly moduBatchService: ModuBatchService) {}

  @Get()
  getHello(): string {
    return this.moduBatchService.getHello();
  }
}
