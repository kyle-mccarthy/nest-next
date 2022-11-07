import { FC } from 'react';
import Link from 'next/link';

interface IProps {
  pageProps: {
    title: string;
    description: string;
  }
}

const IndexPage: FC<IProps> = ({ pageProps }) => {
  return (
    <>
      <h1>{pageProps.title}</h1>
      <h1>{pageProps.description}</h1>
      <Link href='page'>To Page</Link>
    </>
  )
}

export default IndexPage;
