import EmblaCarousel from '@/components/EmblaCarousel'
import { Data } from '@/lib/getSourceKeys'
import IconLoading from '@/public/infinity.svg'
import type { EmblaOptionsType } from 'embla-carousel-react'
import { isEmpty } from 'lodash'
import { useMemo } from 'react'
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
  data: Data
}

function Content({ category, data }: ContentProps) {
  const showContent = useMemo(() => !isEmpty(data), [data])
  return showContent ? (
    <EmblaCarousel
      data={data}
      options={OPTIONS}
      category={category}
    />
  ) : (
    <div className="flex flex-col items-center pt-20">
      <IconLoading width={80} height={80} />
      <p className="font-serif pl-2 text-xl leading-8 text-stone-500">
        Loading...
      </p>
    </div>
  )
}
export default Content
