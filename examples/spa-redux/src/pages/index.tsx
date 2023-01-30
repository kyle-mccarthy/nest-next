import { useSelector } from 'react-redux';
import { IState } from '../common/types/IState';
import { IProduct } from '../common/types/IProduct';
import Link from 'next/link';
import { Feature } from '../common/enums/Feature';
import { INestNextPage } from 'nest-next-spa';

interface IProps {
  x: string;
}

interface IInitialProps {
  y: string;
}

const IndexPage: INestNextPage<IProps, IInitialProps> = ({ x, y }) => {
  const products = useSelector((state: IState) => state[Feature.COMMON].products) as IProduct[];

  return (
    <>
    <h1>Index Page {x} {y}</h1>
      {products?.map((product) => (
        <div key={product.id}>
          <div>{product.name} - {product.id}</div>
          <Link href={product.id}><button>got to product</button></Link>
        </div>
      ))}
    </>
  )
}

IndexPage.getInitialProps = () => ({
  y: 'my y'
})

export default IndexPage;
