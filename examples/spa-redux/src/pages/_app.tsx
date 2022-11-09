import { store } from '../common/redux/store';
import { getNestNextInitialProps, INestNextApp } from 'nest-next-spa';
import { withHydrateStore } from 'nest-next-redux';

const App: INestNextApp = ({ Component, ...props }) => {
  return (
    <Component {...props} />
  )
}

App.getInitialProps = getNestNextInitialProps(() => ({
  x: 'my x'
}))

export default withHydrateStore(App, store);
