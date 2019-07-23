import { NestFactory } from '@nestjs/core';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { AppModule } from './app.module';

async function bootstrap() {
  const dev = process.env.NODE_ENV !== 'production';
  const app = Next({ dev, dir: '../client' });

  await app.prepare();

  const server = await NestFactory.create(AppModule);

  const renderer = server.get(RenderModule);
  renderer.register(server, app, {viewsDir: null, useErrorHandler: /^(?!\/api(\/|$))/ });

  await server.listen(process.env.PORT || 3000);
}

bootstrap();
