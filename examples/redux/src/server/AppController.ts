import { Controller, Get, Param, Render } from '@nestjs/common';
import { AppService } from './AppService';
import { Feature } from '../common/enums/Feature';
import { IState } from '../common/types/IState';

@Controller()
export class AppController {
  public constructor(
    private readonly appService: AppService,
  ) {}

  @Get('')
  @Render('index')
  public index(): Partial<IState> {
    const products = this.appService.getProducts();

    return {
      [Feature.COMMON]: {
        products,
      }
    }
  }

  @Get(':productId')
  @Render(':productId')
  public product(
    @Param('productId') productId: string,
  ): Partial<IState> {
    console.log('prod', productId);
    const product = this.appService.getProduct(productId);

    return {
      [Feature.COMMON]: {
        product,
      }
    }
  }
}
