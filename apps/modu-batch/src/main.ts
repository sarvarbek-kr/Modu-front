import { NestFactory } from '@nestjs/core';
import { ModuBatchModule } from './modu-batch.module';

async function bootstrap() {
  const app = await NestFactory.create(ModuBatchModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
