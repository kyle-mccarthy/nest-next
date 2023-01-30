import { INestNextApp, getNestNextInitialProps } from 'nest-next-spa';
import Head from 'next/head';

const App: INestNextApp = ({ Component, pageProps, ...props }) => {
  return (
    <>
      <Head>
        <title>{pageProps.title}</title>
        <style>{pageProps.style}</style>
      </Head>
      <Component pageProps={pageProps} {...props} />
    </>
  );
};

export default App;

App.getInitialProps = getNestNextInitialProps(() => ({
  pageProps: {
    title: 'Initial Title',
    style: '',
  },
}));

