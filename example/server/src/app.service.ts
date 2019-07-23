import { Injectable } from '@nestjs/common';
import { MessageContainer } from '../../shared/message';

@Injectable()
export class AppService {
  public root(): MessageContainer {
    return {message: 'Hello World!'};
  }
}
