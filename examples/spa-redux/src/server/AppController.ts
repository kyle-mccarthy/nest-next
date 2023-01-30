import { Controller, Param } from '@nestjs/common';
import { AppService } from './AppService';
import { Feature } from '../common/enums/Feature';
import { IState } from '../common/types/IState';
import { Page } from 'nest-next-spa/server';

@Controller()
export class AppController {
  public constructor(
    private readonly appService: AppService,
  ) {}

  @Page('')
  public index(): Partial<IState> {
    const products = this.appService.getProducts();

    return {
      [Feature.COMMON]: {
        products,
      }
    }
  }

  @Page(':productId')
  public product(
    @Param('productId') productId: string,
  ): Partial<IState> {
    const product = this.appService.getProduct(productId);

    return {
      [Feature.PRODUCT]: {
        product,
      }
    }
  }
}
