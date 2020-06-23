import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { AppController } from './app.controller';
import { resolve } from 'path';

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
        dir: resolve(__dirname, '..'),
      }),
      { passthrough404: true, viewsDir: null },
    ),
  ],
  controllers: [AppController],
})
export class AppModule {}
