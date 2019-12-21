import { Module } from '@nestjs/common';
import { RenderModule } from 'nest-next';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [RenderModule],
})
export class AppModule {}
