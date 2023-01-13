import Next from 'next';

import { Module } from '@nestjs/common';

// @ts-expect-error
import { RenderModule } from '../nest-next-dist/render.module';

import { AppController } from './app.controller';

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({ dev: process.env.NODE_ENV === 'development' }),
      {
        viewsDir: null,
      },
    ),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
