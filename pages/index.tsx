import { allDocuments } from 'contentlayer/generated'

import { compareDesc } from 'date-fns'

import IndexStub from '../components/index_stub'

export async function getStaticProps() {
  const posts = allDocuments.filter((x) => x.type != 'About').sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  return { props: { posts } }
}

export default function Index({ posts }) {
  return (
    <>
      <IndexStub posts={posts} />
    </>
  )
}
