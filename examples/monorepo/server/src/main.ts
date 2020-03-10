import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import 'reflect-metadata';
import { AppModule } from './application.module';

async function bootstrap() {
  const server = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  await server.listen(3000);
}

bootstrap();
