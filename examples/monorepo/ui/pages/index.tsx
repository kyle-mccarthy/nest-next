import { NextPage } from 'next';
import Link from 'next/link';

import { IndexProps } from '../../dto/src/IndexPage';

const IndexPage: NextPage<IndexProps> = props => (
  <div>
    <p>
      Hello {props.message}.{' '}
      <Link href="/about">
        <a>About us</a>
      </Link>
    </p>
  </div>
);
IndexPage.getInitialProps = async context => {
  if (context.req) {
    return (context.query as unknown) as IndexProps;
  }
  return { message: 'from client' };
};

export default IndexPage;
