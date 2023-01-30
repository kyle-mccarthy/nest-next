import { IProduct } from '../common/types/IProduct';
import { useSelector } from 'react-redux';
import { IState } from '../common/types/IState';
import { Feature } from '../common/enums/Feature';
import { useRouter } from 'next/router';


const ProductPage = () => {
  const router = useRouter();
  const product = useSelector((state: IState) => state[Feature.PRODUCT].product) as IProduct;

 return (
   <div>
     <button onClick={() => router.back()}>назад</button>
       <>
         <h1>{product.name} - {product.id}</h1>
         <div>{product.price}</div>
       </>
   </div>
 )
}

export default ProductPage;
