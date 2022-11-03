import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { FC } from 'react';

type TPostProps = {
  id: string;
};

const Post: FC<TPostProps> = ({ id }) => {
  return (
    <div>
      <h1>{id}</h1>
      <div>
        <Link href="/">TO HOME</Link>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.query.id;

  return { props: { id } };
};

export default Post;
