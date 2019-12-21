import { NestFactory } from '@nestjs/core';
import { RenderModule } from 'nest-next';
import Next from 'next';
import 'reflect-metadata';
import { AppModule } from './application.module';

async function bootstrap() {
  const dev = process.env.NODE_ENV !== 'production';
  const app = Next({ dev });

  await app.prepare();

  const server = await NestFactory.create(AppModule);

  const renderer = server.get(RenderModule);
  renderer.register(server, app);

  await server.listen(3000);
}

bootstrap();
