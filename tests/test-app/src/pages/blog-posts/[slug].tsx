import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { FC } from 'react';

type TBlogPostProps = {
  slug: string;
};

const BlogPost: FC<TBlogPostProps> = ({ slug }) => {
  return (
    <div>
      <h1>{slug}</h1>
      <div>
        <Link href={'/blog-posts'}>TO BLOG POSTS</Link>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug = ctx.query.slug;

  return { props: { slug } };
};

export default BlogPost;
