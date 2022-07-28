import Link from 'next/link'

import { compareDesc, format, parseISO } from 'date-fns'

import { useMDXComponent } from 'next-contentlayer/hooks'

function ContentCard(post) {
  let Content: any
  if (post.type === 'BookReview') {
    Content = () => <img src={post.cover} />
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
      <article className="blogroll">
        <Content />
      </article>
    </div>
  )
}

export default ContentCard