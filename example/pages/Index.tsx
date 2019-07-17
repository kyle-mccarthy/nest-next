import Link from 'next/link';
import React from 'react';

interface InitialProps {
  query: string;
}

interface Props extends InitialProps {}

class Index extends React.Component<Props> {
  public static getInitialProps({ query }: InitialProps) {
    console.log(arguments);
    return { query };
  }

  public render() {
    return (<div>{this.props.query} at {(new Date()).toString()}<Link href="/"><a>Refresh</a></Link></div>);
  }
}

export default Index;
