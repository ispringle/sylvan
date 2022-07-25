import Head from 'next/head'
import Link from 'next/link'
import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts } from 'contentlayer/generated'

export async function getStaticProps() {
  const posts = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date))
  })
  return { props: { posts } }
}

function PostCard(post) {
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
      <div dangerouslySetInnerHTML={{ __html: post.body.html }} />
    </div>
  )
}

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Sylvan</title>
      </Head>
      <h1>Sylvan</h1>

      {posts.reverse().map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
  </div>
  )
}
