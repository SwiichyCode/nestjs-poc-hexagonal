import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './infrastructure/middlewares/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);

  await app.listen(8080);
}

bootstrap();
