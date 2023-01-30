import { IRootState, store } from '../common/redux/store';
import { FC } from 'react';
import { AppProps } from 'next/app';
import { NextPage, NextPageContext } from 'next';
import { withHydrateStore } from 'nest-next-redux';

interface IProps {
  serverStore: Partial<IRootState>;
}

export type INestNextApp<
  Props extends Record<string, any> = Record<string, any>
> = FC<AppProps & Props> & {
  getInitialProps?(props: { ctx: NextPageContext; Component: NextPage }): any;
};

const App: INestNextApp<IProps> = ({ Component, ...props }) => {
  return (
    <Component {...props} />
  )
}

App.getInitialProps = (context) => {
  return {
    pageProps: context.ctx.query
  }
}

export default withHydrateStore(App, store);
