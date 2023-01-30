import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public getPageName(): string {
    return 'App Page Title';
  }
}
