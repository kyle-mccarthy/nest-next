import { Injectable } from '@nestjs/common';
import { IProduct } from '../common/types/IProduct';
import productId from '../pages/[productId]';

@Injectable()
export class AppService {
  private products: IProduct[] = [
    {
      id: '1',
      price: 200,
      name: 'Product 1',
    },
    {
      id: '2',
      price: 100,
      name: 'Product 2',
    }
  ];

  public getProducts(): IProduct[] {
    return this.products;
  }

  public getProduct(id: string): IProduct | undefined {
    return this.products.find((product) => product.id === id)
  }
}
