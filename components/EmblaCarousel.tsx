import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import Image from 'next/image'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Thumb } from './EmblaCarouselThumbsButton'

const srcPrefix =
  'https://processed-images-ap-east-1.s3.ap-east-1.amazonaws.com/'

type PropType = {
  slides: string[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi],
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()
    emblaMainApi.on('select', onSelect)
    emblaMainApi.on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  const thumbs = useMemo(() => {
    return slides?.map((key) => key!.replace('/source/', '/thumb/'))
  }, [slides])

  return (
    <div className="embla h-full pb-10 flex flex-col">
      <div className="embla__viewport relative flex-1" ref={emblaMainRef}>
        <div className="embla__container absolute left-0 top-0 right-0 bottom-0">
          {slides.map((key, index) => (
            <div className={`embla__slide h-full ${index === selectedIndex ? 'is-selected': ''}`} key={index}>
              <Image
                className="object-contain"
                // className="absolute left-0 top-0 object-contain"
                src={srcPrefix + key}
                alt="error"
                fill
                quality={100}
                // placeholder="blur"
                // blurDataURL={blurData.data}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {thumbs.map((thumbKey, index) => (
              <Thumb
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                imgSrc={srcPrefix + thumbKey}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
