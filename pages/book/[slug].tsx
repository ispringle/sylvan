import Head from 'next/head'
import Link from 'next/link'

import { format, parseISO } from 'date-fns'

import { allBookReviews } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'

import Header from '../header'

export async function getStaticPaths() {
  const paths = allBookReviews.map((post) => post.url)
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const content = allBookReviews.find((content) => content.slug === params.slug)
  return {
    props: {
      content,
    },
  }
}

const BookReviewLayout: React.FC<{ content }> = ({ content }) => {
  const MDXContent = useMDXComponent(content.body.code)

  return (
    <>
      <Head>
        <title>{content.title}</title>
      </Head>
      <Header />
      <main>
        <article>
          <div>
            <h1>{content.title}</h1>
            <time dateTime={content.date}>
              {format(parseISO(content.date), 'LLLL d, yyyy')}
            </time>
          </div>
          <div>
            <img src={content.cover} width={256} height={"auto"} />
          </div>
          <MDXContent />
        </article>
      </main>
    </>
  )
}

export default BookReviewLayout
