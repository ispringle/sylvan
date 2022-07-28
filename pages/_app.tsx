import type { AppProps } from 'next/app'
import Head from 'next/head'

import '../style/style.sass'

import Header from '../components/header'
import Footer from '../components/footer'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Ian S. Pringle</title>
      </Head>
      <Header />

      <Component {...pageProps} />
      <Footer />
    </>
  )
}
