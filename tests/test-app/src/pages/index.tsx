import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { FC } from 'react';

type THomeProps = {};

const Home: FC<THomeProps> = ({}) => {
  return (
    <div>
      <h1>HOME</h1>
      <div>
        <Link href="/1">TO 1</Link>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};

export default Home;
