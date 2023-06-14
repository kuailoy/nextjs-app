import useSWR from 'swr'
import EmblaCarousel from '@/components/EmblaCarousel'
import type { EmblaOptionsType } from 'embla-carousel-react'

// interface MyLoaderParams {
//   src: string
//   width: number
//   quality?: number
// }

// const myLoader = ({ src, width, quality = 100 }: MyLoaderParams) => {
//   return `${src}?imageView2/1/w/${width}/q/${quality}`
// }
const OPTIONS: EmblaOptionsType = { loop: true }

function Home() {
  const { data: keys = {} } = useSWR(`/api/keys?folderName=kk/source`)
  const { sourceKeys = [], blurKeys = [] } = keys
  return (
    sourceKeys?.length > 0 && <EmblaCarousel slides={sourceKeys} options={OPTIONS}/>
  )
}
export default Home