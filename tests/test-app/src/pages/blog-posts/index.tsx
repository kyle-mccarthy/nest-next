import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { FC } from 'react';

type TBlogPostsProps = {};

const BlogPosts: FC<TBlogPostsProps> = ({}) => {
  return (
    <div>
      <h1>BLOG POSTS</h1>
      <div>
        <Link href="/blog-posts/1">TO BLOG POST 1</Link>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} };
};

export default BlogPosts;
