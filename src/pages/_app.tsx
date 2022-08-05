import type { AppProps } from 'next/app'
import Head from 'next/head'

import '../style/style.sass'

import Header from '../components/Header'

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>ian.ist</title>
            </Head>
            <Header />

            <Component {...pageProps} />
        </>
    )
}
