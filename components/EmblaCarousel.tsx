import IconInstagram from '@/public/instagram.svg'
import IconTiktok from '@/public/tiktok.svg'
import IconWeibo from '@/public/weibo.svg'
import { HStack, SlideFade, Spacer } from '@chakra-ui/react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import Image from 'next/image'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { NextButton, PrevButton } from './EmblaCarouselArrowsButton'
import { Thumb } from './EmblaCarouselThumbsButton'

const srcPrefix =
  'https://processed-images-ap-east-1.s3.ap-east-1.amazonaws.com/'

const navs = [
  'Portrait',
  'Family',
  'Street',
  'LandScape',
  'Travel',
  'Video',
  'About',
]

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
  const [thumbVisible, setThumbVisible] = useState(false)
  const [activeNav, setActiveNav] = useState(navs[0])

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

  const scrollPrev = useCallback(
    () => emblaMainApi && emblaMainApi.scrollPrev(),
    [emblaMainApi],
  )
  const scrollNext = useCallback(
    () => emblaMainApi && emblaMainApi.scrollNext(),
    [emblaMainApi],
  )

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
    <div className="embla flex h-full flex-col">
      <div
        className="embla__viewport relative flex-1 overflow-hidden"
        ref={emblaMainRef}
      >
        <div className="embla__container absolute bottom-0 left-0 right-0 top-0 flex !transform-none touch-pan-y">
          {slides.map((key, index) => (
            <div
              className={`embla__slide h-full ${
                index === selectedIndex ? 'is-selected' : ''
              }`}
              key={index}
            >
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
        <PrevButton onClick={scrollPrev} />
        <NextButton onClick={scrollNext} />
      </div>

      <SlideFade
        in={thumbVisible}
        className="absolute bottom-16 left-0 right-0 z-10"
      >
        <div
          className={`embla-thumbs`}
          onMouseLeave={() => setThumbVisible(false)}
        >
          <div
            className="embla-thumbs__viewport overflow-hidden"
            ref={emblaThumbsRef}
          >
            <div className="embla-thumbs__container flex">
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
      </SlideFade>

      <div className="flex h-16 p-4" onMouseEnter={() => setThumbVisible(true)}>
        <h2 className="font-serif pl-4 font-italic text-xl italic leading-8 text-stone-500">
          Han Ding
        </h2>
        <ul className="flex w-2/3 pl-6">
          {navs.map((nav) => (
            <li
              key={nav}
              className={`pl-6 leading-8 transition cursor-pointer ${
                activeNav === nav ? 'text-[#38b2ac]' : 'text-stone-400'
              }`}
              onClick={() => setActiveNav(nav)}
            >
              {nav}
            </li>
          ))}
        </ul>
        <Spacer />
        <HStack spacing="12px" className="pr-4">
          <IconTiktok width={24} height={24} fill="#A8A29E" />
          <IconWeibo width={24} height={24} fill="#A8A29E" />
          <IconInstagram width={24} height={24} fill="#A8A29E" />
        </HStack>
      </div>
    </div>
  )
}

export default EmblaCarousel
