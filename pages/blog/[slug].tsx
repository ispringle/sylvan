import Head from 'next/head'
import Link from 'next/link'

import { format, parseISO } from 'date-fns'

import { allBlogPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'

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

const BlogPostLayout: React.FC<{ content }> = ({ content }) => {
  const MDXContent = useMDXComponent(content.body.code)

  return (
    <>
      <main>
        <article className="actual">
          <div>
            <h1>{content.title}</h1>
            <time dateTime={content.date}>
              {format(parseISO(content.date), 'LLLL d, yyyy')}
            </time>
          </div>
          <MDXContent />
        </article>
      </main>
    </>
  )
}

export default BlogPostLayout
