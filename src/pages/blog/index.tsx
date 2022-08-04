import Head from 'next/head'

import { compareDesc } from 'date-fns'

import { allBlogPosts } from 'contentlayer/generated'

import IndexStub from '../../components/index_stub'

export async function getStaticProps() {
  const posts = allBlogPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  return { props: { posts } }
}

export default function Index({ posts }) {
  return (
    <>
      <Head><title>Blog Roll</title></Head>
      <IndexStub posts={posts} />
    </>
  )
}
