import type { AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";

import "../style/style.sass";
import SEO from "../../next-seo.config";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ian.ist</title>
        <link rel="icon" href="/fleuron.svg" />
      </Head>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  );
}
