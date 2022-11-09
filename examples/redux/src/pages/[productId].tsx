import { IProduct } from '../common/types/IProduct';
import { NextPage } from 'next';
import { useSelector } from 'react-redux';
import { IState } from '../common/types/IState';

interface IProps {
 product: IProduct;
}

const ProductPage: NextPage<IProps> = () => {
  const product = useSelector((state: IState) => state.common.product) as IProduct;

 return (
   <div>
     <h1>{product.name} - {product.id}</h1>
     <div>{product.price}</div>
   </div>
 )
}

export default ProductPage;
