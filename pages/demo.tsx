import { getImage } from '@/lib/client'
import Image from 'next/image'

interface DemoProps {
  img: string
}

export default function Demo({ img }: DemoProps) {
  return (
    <Image
      src={img}
      alt="naonao"
      width={1000}
      height={1000}
      placeholder="blur"
      blurDataURL={img}
    />
  )
}

export async function getServerSideProps() {
  const img = await getImage()
  return {
    props: {
      img,
    },
  }
}
