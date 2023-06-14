import EmblaCarousel from '@/components/EmblaCarousel'
import type { EmblaOptionsType } from 'embla-carousel-react'
import useSWR from 'swr'

// interface MyLoaderParams {
//   src: string
//   width: number
//   quality?: number
// }

// const myLoader = ({ src, width, quality = 100 }: MyLoaderParams) => {
//   return `${src}?imageView2/1/w/${width}/q/${quality}`
// }
const OPTIONS: EmblaOptionsType = { loop: true }

interface ContentProps {
  category: string
}

function Content({ category = 'family' }: ContentProps) {
  const { data: keys = {} } = useSWR(`/api/keys?folderName=${category}/source`)
  const { sourceKeys = [], blurKeys = [] } = keys
  return sourceKeys?.length > 0 ? (
    <EmblaCarousel slides={sourceKeys} options={OPTIONS} category={category} />
  ) : (
    <div>loading...</div>
  )
}
export default Content
