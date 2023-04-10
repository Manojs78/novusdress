import '@/styles/globals.css'
import '@/styles/style.css'
import '@/styles/responsive.css'
import '@/styles/bootstrep.css'
import '@/styles/ngprogress.css'
import LayoutComponent from '@/Components/Layouts/LayoutComponent'
import { wrapper } from "../app/store"
import { Provider } from 'react-redux';
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module


Router.events.on('routeChangeStart', () => NProgress.start()); Router.events.on('routeChangeComplete', () => NProgress.done()); Router.events.on('routeChangeError', () => NProgress.done()); 
function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  
  const { pageProps } = props;
  return (
    <>
    <Provider store={store}>
    <LayoutComponent>
      <Component {...pageProps} />
    </LayoutComponent>
    </Provider>
    
    </>
  )
}


export default App;
