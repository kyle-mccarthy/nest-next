import { NextPage } from 'next';
import Link from 'next/link';

import { AboutProps } from '../../dto/src/AboutPage';

const AboutPage: NextPage<AboutProps> = props => (
  <div>
    <p>
      This is about the {props.message} page.{' '}
      <Link href="/">
        <a>Go back to the home page</a>
      </Link>
    </p>
  </div>
);
AboutPage.getInitialProps = async context => {
  if (context.req) {
    return (context.query as unknown) as AboutProps;
  }
  return { message: 'client' };
};
export default AboutPage;
