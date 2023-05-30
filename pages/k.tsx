// import SliderBox from '@/components/SliderBox'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import useSWR from 'swr'
import Loading from '../components/Loading'
import EmblaCarousel from '@/components/EmblaCarousel'
// import styles from '../styles/k.module.css'

// interface MyLoaderParams {
//   src: string
//   width: number
//   quality?: number
// }

// const myLoader = ({ src, width, quality = 100 }: MyLoaderParams) => {
//   return `${src}?imageView2/1/w/${width}/q/${quality}`
// }
function Demo() {
  const { data: keys = {} } = useSWR(`/api/keys?folderName=kk/source`)
  const { sourceKeys = [], blurKeys = [] } = keys
  return (
    sourceKeys?.length > 0 && <EmblaCarousel slides={sourceKeys} />
  )
}
export default withPageAuthRequired(Demo as any, {
  onRedirecting: () => <Loading />,
  onError: (error) => <div>{error.message}</div>,
})
