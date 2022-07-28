import Head from 'next/head'

import { compareDesc } from 'date-fns'

import { allAbouts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'

export async function getStaticProps() {
  const post = allAbouts[0]
  return { props: { post } }
}

export default function Index({ post }) {
  const Content = useMDXComponent(post.body.code)

  return (
    <>
      <Head><title>About</title></Head>
      <main>
        <div id="about">
          <Content />
        </div>
      </main>
    </>
  )
}
