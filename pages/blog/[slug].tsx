import Head from 'next/head'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { allBlogPosts } from 'contentlayer/generated'

export async function getStaticPaths() {
  const paths = allBlogPosts.map((post) => post.url)
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const content = allBlogPosts.find((content) => content.slug === params.slug)
  return {
    props: {
      content,
    },
  }
}

const BlogPostLayout = ({ content }) => {
  return (
    <>
      <Head>
        <title>{content.title}</title>
      </Head>
      <article>
        <div>
          <Link href="/">
            <a>Home</a>
          </Link>
        </div>
        <div>
          <h1>{content.title}</h1>
          <time dateTime={content.date}>
            {format(parseISO(content.date), 'LLLL d, yyyy')}
          </time>
        </div>
        <div dangerouslySetInnerHTML={{ __html: content.body.html }} />
      </article>
    </>
  )
}

export default BlogPostLayout
