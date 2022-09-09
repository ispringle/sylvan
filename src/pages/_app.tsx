import type { AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import { useEffect } from "react";

import { clockCursor } from "cursor-effects";

import "../style/style.sass";
import SEO from "../../next-seo.config";

export default function MyApp({ Component, pageProps }: AppProps) {
  /* useEffect(() => {
   *   let cursorOn = false;
   *   window.addEventListener("mousemove", function (event) {
   *     const targetEl = this.document.getElementsByTagName("main")[0];
   *     const elUnderCursor = Array.from(document.querySelectorAll(":hover"));
   *     if (!elUnderCursor.includes(targetEl)) {
   *       cursorOn = true;
   *     } else {
   *       cursorOn = false;
   *     }
   *     console.log(cursorOn);
   *   });
   *   if (cursorOn) {
   *     clockCursor();
   *   }
   * }); */
  return (
    <>
      <Head>
        <title>ian.ist</title>
        <link rel="icon" href="fleuron.svg" />
      </Head>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  );
}
