import { GetStaticPaths, GetStaticProps } from 'next';
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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [1, 2].map((id) => ({ params: { id: String(id) } }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = ctx.params!.id;

  return { props: { id } };
};

export default Post;
