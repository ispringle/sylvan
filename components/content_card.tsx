import Image from 'next/image'
import Link from 'next/link'

import { compareDesc, format, parseISO } from 'date-fns'

import { useMDXComponent } from 'next-contentlayer/hooks'

import { getImage } from './image_content'

function ContentCard(post) {
  let Content = useMDXComponent(post.body.code)
  if (post.type === 'BookReview') {
    Content = getImage(post.cover)
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
      <article className="blogroll">
        <Content />
      </article>
    </div>
  )
}

export default ContentCard
