import Link from 'next/link';
import { INestNextPage } from 'nest-next-spa';

interface IProps {
  pageProps: {
    title?: string;
    description?: string;
  }
}

interface IGetInitialProps {
  additionalText: string;
}

const IndexPage: INestNextPage<IProps, IGetInitialProps> = ({ pageProps , additionalText}) => {
  return (
    <>
      {JSON.stringify(pageProps)}
      <h1>{pageProps.title}</h1>
      <h1>{pageProps.description}</h1>
      <div>{additionalText}</div>
      <Link href='/'>To Index</Link>
    </>
  )
}

IndexPage.getInitialProps = () => {
  console.log('init');
  return {
    additionalText: 'additional text'
  }
}

export default IndexPage;
