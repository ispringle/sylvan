import Link from 'next/link'

import ContentCard from './content_card'

export default function IndexStub({ posts }) {
  return (
    <>
      <main>
        {posts.map((post, idx) => (
          <ContentCard key={idx} {...post} />
        ))}
      </main>
    </>
  )
}
