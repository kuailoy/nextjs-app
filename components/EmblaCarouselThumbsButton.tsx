import Image from 'next/image'
import React from 'react'
import styles from '@/styles/image.module.css'


// interface MyLoaderParams {
//   src: string
//   width: number
//   quality?: number
// }

// const myLoader = ({ src, width = 300, quality = 100 }: MyLoaderParams) => {
//   return `${src}?imageView2/1/w/${width}/q/${quality}`
// }

type PropType = {
  selected: boolean
  imgSrc: string
  blurSrc: string
  index: number
  onClick: () => void
}

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, blurSrc, imgSrc, index, onClick } = props

  const handleImageLoad = (event: any) => {
    event.target.classList.add(styles.loaded);
  };

  return (
    <div
      className={'embla-thumbs__slide m-0.5'.concat(
        selected ? ' embla-thumbs__slide--selected' : '',
      )}
    >
      <button
        onClick={onClick}
        className="embla-thumbs__slide__button"
        type="button"
      >
        <Image
          className={`${styles.image} object-fit absolute left-0 top-0`}
          src={imgSrc}
          alt="error"
          fill
          quality={100}
          onLoad={handleImageLoad}
          placeholder="blur"
          blurDataURL={blurSrc}
        />
      </button>
    </div>
  )
}
