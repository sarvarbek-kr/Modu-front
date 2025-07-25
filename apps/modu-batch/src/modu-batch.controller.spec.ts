import { Test, TestingModule } from '@nestjs/testing';
import { ModuBatchController } from './modu-batch.controller';
import { ModuBatchService } from './modu-batch.service';

describe('ModuBatchController', () => {
  let moduBatchController: ModuBatchController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ModuBatchController],
      providers: [ModuBatchService],
    }).compile();

    moduBatchController = app.get<ModuBatchController>(ModuBatchController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(moduBatchController.getHello()).toBe('Hello World!');
    });
  });
});
