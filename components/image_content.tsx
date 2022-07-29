import dynamic from 'next/dynamic'
import Image from 'next/Image'

import { images } from '../public'
import pic from '../public/book/the-red-knight-cover.jpg'

const ImageContent = ({ src }) => {
  const altText = src.split('/')
                    .at(-1).split('.')
                    .at(0).split('-')
                    .map(
                      x => x.charAt(0).toUpperCase() + x.slice(1))
                    .join(' ')

  return (
    <Image src={pic} alt={altText} />
  )
}

ImageContent.displayName = "ImageContent"

const getImage = (src) => () => <ImageContent src={src} />

export default ImageContent
export { getImage }
