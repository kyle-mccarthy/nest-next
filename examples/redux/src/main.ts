import { NestFactory } from '@nestjs/core';
import { AppModule } from './server/AppModule';

async function bootstrap() {
  const server = await NestFactory.create(AppModule);

  await server.listen(3000);
}

void bootstrap();
