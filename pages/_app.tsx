import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Providers from '../providers';
import Layout from '@/components/styles/layout';
import MainHeader from '@/components/styles/header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Providers>
        <MainHeader />
        <Component {...pageProps} />    
      </Providers>    
    </Layout>
  )    
}
