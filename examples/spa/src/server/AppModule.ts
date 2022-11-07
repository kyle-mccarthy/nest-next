import { NestNextSpaModule } from 'nest-next-spa/server';
import { AppController } from './AppController';
import { Module } from '@nestjs/common';
import Next from 'next';
import { RenderModule } from 'nest-next';

@Module({
  controllers: [AppController],
  imports: [
    NestNextSpaModule,
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
      }),
      { passthrough404: true, viewsDir: null },
    ),
  ],
})
export class AppModule {}
