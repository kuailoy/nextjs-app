import { getDemoImage } from '@/lib/client'
import Image from 'next/image'

interface DemoProps {
  img: string
}

interface MyLoaderParams {
  src: string
  width: number
  quality?: number
}

const myLoader = ({ src, width, quality = 75 }: MyLoaderParams) => {
  return `${src}?imageView2/1/w/${width}/q/${quality}/interlace/1`
}

export default function Demo({ img }: DemoProps) {
  console.log('img: ', img)
  return (
    <Image
      loader={myLoader}
      src={img}
      alt="naonao"
      width={1024}
      height={683}
      quality={75}
      // placeholder="blur"
      // blurDataURL={img}
    />
  )
}

export async function getStaticProps() {
  const img = getDemoImage()
  return {
    props: {
      img,
    },
  }
}
