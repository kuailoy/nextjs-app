import styles from '@/styles/image.module.css'
import Image from 'next/image'

const PLACEHOLDER_SRC = `data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D`

type PropType = {
  imgSrc: string
  inView: boolean
  index: number
  selectedIndex: number
  blurDataURL: string
}

export const LazyLoadImage: React.FC<PropType> = (props) => {
  const { imgSrc, inView, index, selectedIndex, blurDataURL } = props

  const handleImageLoad = (event: any) => {
    event.target.classList.add(styles.loaded)
  }

  return (
    <div
      className={`embla__slide h-full ${
        index === selectedIndex ? 'is-selected' : ''
      }`}
      key={index}
    >
      <Image
        className={`${styles.image} object-contain`}
        src={inView ? imgSrc : PLACEHOLDER_SRC}
        alt="error"
        fill
        quality={100}
        onLoad={handleImageLoad}
        placeholder="blur"
        blurDataURL={blurDataURL}
      />
    </div>
  )
}
