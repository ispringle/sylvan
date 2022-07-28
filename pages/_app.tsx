import type { AppProps } from 'next/app'
import Head from 'next/head'

import '../style/style.sass'

import Header from '../components/header'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Sylvan</title>
      </Head>
      <Header />

      <Component {...pageProps} />
    </>
  )
}
