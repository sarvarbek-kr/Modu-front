import { Module } from '@nestjs/common';
import { ModuBatchController } from './modu-batch.controller';
import { ModuBatchService } from './modu-batch.service';

@Module({
  imports: [],
  controllers: [ModuBatchController],
  providers: [ModuBatchService],
})
export class ModuBatchModule {}
