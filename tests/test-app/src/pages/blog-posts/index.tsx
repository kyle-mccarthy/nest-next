import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { FC } from 'react';

type TBlogPostsProps = {
  title: string;
};

const BlogPosts: FC<TBlogPostsProps> = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
      <div>
        <Link href="/blog-posts/some-post">TO BLOG POST "some-post"</Link>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // GSSP will get query from controller only on first load (not on navigation)
  return { props: { title: ctx.query.title || 'FALLBACK BLOG POSTS' } };
};

export default BlogPosts;
