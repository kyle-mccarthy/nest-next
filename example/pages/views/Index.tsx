import React from 'react';

interface InitialProps {
  query: string;
}

interface Props extends InitialProps {}

class Index extends React.Component<Props> {
  public static getInitialProps({ query }: InitialProps) {
    return { query };
  }

  public render() {
    return (<div>{this.props.query}</div>);
  }
}

export default Index;
