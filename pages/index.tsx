
import Head from 'next/head'
import Link from 'next/link'

import { compareDesc, format, parseISO } from 'date-fns'

import { allDocuments } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'

export async function getStaticProps() {
  const posts = allDocuments.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  return { props: { posts } }
}

function ContentCard(post) {
  let Content: any
  if (post.type === 'BookReview') {
    Content = () => <img src={post.cover} width={128} height={'auto'} />
  } else {
    Content = useMDXComponent(post.body.code)
  }

  return (
    <div>
      <h2>
        <Link href={post.url}>
          <a>{post.title}</a>
        </Link>
      </h2>
      <time dateTime={post.date}>
        {format(parseISO(post.date), 'LLLL d, yyyy')}
      </time>
      <article>
        <Content />
      </article>
    </div>
  )
}

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Sylvan</title>
      </Head>
      <header>
        <h1>Sylvan</h1>
      </header>
      <main>
        {posts.map((post, idx) => (
          <ContentCard key={idx} {...post} />
        ))}
      </main>
  </div>
  )
}
