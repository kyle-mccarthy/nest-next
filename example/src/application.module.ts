import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import { AppController } from './app.controller';

@Module({
  imports: [RenderModule],
  controllers: [AppController]
})
export class AppModule {}
