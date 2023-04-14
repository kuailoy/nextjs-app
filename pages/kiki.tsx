import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import Image from 'next/image'
import { useEffect } from 'react'
import useSWR from 'swr'
import Loading from '../components/Loading'
// interface DemoProps {
//   // img: string
//   user: string;
// }

interface MyLoaderParams {
  src: string
  width: number
  quality?: number
}

const myLoader = ({ src, width, quality = 100 }: MyLoaderParams) => {
  return `${src}?imageView2/1/w/${width}/q/${quality}`
}

function Demo() {
  const { data } = useSWR('/api/images')
  useEffect(() => {
    console.log('data: ', data?.images)
  }, [data])

  return data?.images && (
    <Image
      loader={myLoader}
      src={data?.images[0]}
      alt="naonao"
      width={1024}
      height={683}
      // quality={75}
      // placeholder="blur"
      // blurDataURL={data?.images[0]}
    />
    // <img src={myLoader({src: data.images[0], width: 1024})} alt="" />
  )
}
export default withPageAuthRequired(Demo as any, {
  onRedirecting: () => <Loading />,
  onError: (error) => <div>{error.message}</div>,
})
