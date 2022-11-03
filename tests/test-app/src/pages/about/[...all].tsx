import { GetServerSideProps } from 'next';
import { FC } from 'react';

type TAboutAllProps = {
  query: unknown;
};

const AboutAll: FC<TAboutAllProps> = ({ query }) => {
  return (
    <div>
      <h1>ALL ABOUT</h1>
      <div id="query">{query}</div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return { props: ctx.query };
};

export default AboutAll;