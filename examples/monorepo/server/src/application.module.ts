import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { resolve } from 'path';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
        dir: resolve(__dirname, '../../ui'),
      }),
      {
        viewsDir: ''
      }
    ),
  ],
})
export class AppModule {}
