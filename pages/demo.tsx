import { getImage } from '@/lib/client'
import Image from 'next/image'

interface DemoProps {
  img: string
}

export default function Demo({ img }: DemoProps) {
  console.log('img: ', img)
  return (
    <Image src={img} alt="Picture of the author" width={100} height={100} />
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
