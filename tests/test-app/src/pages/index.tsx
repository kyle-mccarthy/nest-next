import { GetStaticProps } from 'next';
import Link from 'next/link';
import { FC } from 'react';

type THomeProps = { title: string };

const Home: FC<THomeProps> = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
      <div>
        <Link href="/1">TO 1</Link>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: { title: 'HOME' } };
};

export default Home;
