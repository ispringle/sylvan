import type { AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import { useEffect } from "react";

import { clockCursor } from "cursor-effects";

import "../style/style.sass";
import SEO from "../../next-seo.config";
import Header from "../components/Header";
import { cursorTo } from "readline";

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const targetEl = document.getElementsByTagName("main")[0];
    clockCursor();
  });
  return (
    <>
      <Head>
        <title>ian.ist</title>
        <link rel="icon" href="fleuron.svg" />
      </Head>
      <DefaultSeo {...SEO} />
      <Header />

      <Component {...pageProps} />
    </>
  );
}
