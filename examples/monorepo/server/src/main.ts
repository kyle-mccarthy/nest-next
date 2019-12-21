import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { resolve } from 'path';
import 'reflect-metadata';
import { AppModule } from './application.module';

async function bootstrap() {
  const dev = process.env.NODE_ENV !== 'production';
  const dir = resolve(__dirname, '../../ui');
  const app = Next({ dev, dir });

  await app.prepare();

  const server = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const renderer = server.get(RenderModule);
  renderer.register(server, app, { viewsDir: '' });

  await server.listen(3000);
}

bootstrap();
