import Head from 'next/head'
import Link from 'next/link'

import { format, parseISO } from 'date-fns'

import { allBookReviews } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'

import { getImage } from '../../components/image_content'

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
  const ImageContent = getImage(content.cover)

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

export default BookReviewLayout
