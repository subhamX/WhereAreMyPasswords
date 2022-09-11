import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
  <Component {...pageProps} />
  <ToastContainer autoClose={1000} />

  </>
}

export default MyApp
