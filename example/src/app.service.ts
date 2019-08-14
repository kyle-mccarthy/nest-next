import { Injectable } from '@nestjs/common';
import { MessageContainer } from './types.shared';

@Injectable()
export class AppService {
  public root(): MessageContainer {
    return {message: 'Hello World!'};
  }
}
