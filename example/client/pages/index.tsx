import Link from 'next/link';
import React from 'react';
import { MessageContainer } from '../../shared/message';

interface InitialProps {
  req?: object;
  query: Partial<MessageContainer>;
  pathname: string;
  asPath: string;
}

class Index extends React.Component<InitialProps> {
  public static async getInitialProps({ req, pathname, query }: InitialProps) {
    if (typeof req === 'undefined') {
      query = (await (await fetch(
        '/api' + pathname
      )).json()) as MessageContainer;
    }
    return { query };
  }

  public render() {
    return (
      <div>{this.props.query.message} at {((new Date()).valueOf() / 1000).toFixed(0)} <Link href="/about" as="/about">
        <a>About</a>
      </Link></div>
    );
  }
}

export default Index;
