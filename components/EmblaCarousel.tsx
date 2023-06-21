import { URL_PREFIX } from '@/config'
import { Data } from '@/lib/getSourceKeys'
import IconInstagram from '@/public/instagram.svg'
import IconMore from '@/public/more.svg'
import IconTiktok from '@/public/tiktok.svg'
import IconWeibo from '@/public/weibo.svg'
import { HStack, SlideFade, Spacer } from '@chakra-ui/react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { NextButton, PrevButton } from './EmblaCarouselArrowsButton'
import EmblaThumbs from './EmblaThumbs'
import { LazyLoadImage } from './LazyLoadImage'

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
  data: Data
  category?: string
  options?: EmblaOptionsType
  isMobile: boolean
}
const EmblaCarousel: React.FC<PropType> = (props) => {
  const { data, options, category = 'family', isMobile } = props
  const slides = useMemo(() => Object.keys(data), [data])

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  })
  const [thumbVisible, setThumbVisible] = useState(false)
  const [activeNav, setActiveNav] = useState(() =>
    navs.find((nav) => nav.toUpperCase() === category.toUpperCase()),
  )
  // slides already in view
  const [slidesInView, setSlidesInView] = useState<number[]>([])

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi],
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return

    if (slidesInView.length !== emblaMainApi.slideNodes().length) {
      setSlidesInView((slidesInView) => {
        const inView = emblaMainApi
          .slidesInView(true)
          .filter((index) => !slidesInView.includes(index))
        return slidesInView.concat(inView)
      })
    }
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex, slidesInView.length])

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
    return slides?.map((key) => data[key].thumb)
  }, [data, slides])

  const blurData = useMemo(() => {
    return slides?.map((key) => data[key].blur)
  }, [data,slides])

  return (
    <div className="relative flex h-full flex-col">
      <div className="flex justify-between p-4 pt-6 sm:hidden">
        <h2 className="font-serif font-italic text-xl italic leading-8 text-stone-500">
          Han Ding
        </h2>
        <IconMore width={32} height={32} />
      </div>
      <div className="embla flex flex-1 flex-col pb-1">
        <div
          className="embla__viewport relative flex-1 overflow-hidden"
          ref={emblaMainRef}
        >
          <div className="embla__container absolute bottom-0 left-0 right-0 top-0 flex !transform-none touch-pan-y">
            {slides.map((key, index) => (
              <LazyLoadImage
                key={key}
                index={index}
                selectedIndex={selectedIndex}
                imgSrc={URL_PREFIX + key}
                blurDataURL={data[key].blur}
                inView={slidesInView.indexOf(index) > -1}
              />
            ))}
          </div>
          <PrevButton onClick={scrollPrev} />
          <NextButton onClick={scrollNext} />
        </div>
      </div>
      <div className="bottom-0.5 sm:absolute sm:bottom-16 sm:left-0 sm:right-0 sm:z-10">
        {isMobile ? (
          <EmblaThumbs
            ref={emblaThumbsRef}
            setThumbVisible={setThumbVisible}
            selectedIndex={selectedIndex}
            thumbs={thumbs}
            blurData={blurData}
            onThumbClick={onThumbClick}
            isMobile={isMobile}
          />
        ) : (
          <SlideFade in={thumbVisible}>
            <EmblaThumbs
              ref={emblaThumbsRef}
              setThumbVisible={setThumbVisible}
              selectedIndex={selectedIndex}
              thumbs={thumbs}
              blurData={blurData}
              onThumbClick={onThumbClick}
              isMobile={isMobile}
            />
          </SlideFade>
        )}
      </div>

      <div
        className="hidden h-16 p-4 sm:flex"
        onMouseEnter={() => setThumbVisible(true)}
      >
        <h2 className="font-serif pl-4 font-italic text-xl italic leading-8 text-stone-500">
          Han Ding
        </h2>
        <ul className="flex w-2/3 pl-6">
          {navs.map((nav) => (
            <li
              key={nav}
              className={`cursor-pointer pl-6 leading-8 transition ${
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
