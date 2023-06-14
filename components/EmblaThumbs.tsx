import { URL_PREFIX } from '@/config'
import { forwardRef } from 'react'
import { Thumb } from './EmblaCarouselThumbsButton'



interface EmblaThumbsProps {
  setThumbVisible: React.Dispatch<React.SetStateAction<boolean>>
  onThumbClick: (index: number) => void
  thumbs: string[]
  selectedIndex: number
}

const EmblaThumbs = forwardRef<HTMLDivElement, EmblaThumbsProps>(
  function EmblaThumbs(props, ref) {
    const { thumbs, selectedIndex, setThumbVisible, onThumbClick } = props

    return (
      <div
        className={`embla-thumbs`}
        onMouseLeave={() => setThumbVisible(false)}
      >
        <div className="embla-thumbs__viewport overflow-hidden" ref={ref}>
          <div className="embla-thumbs__container flex">
            {thumbs.map((thumbKey, index) => (
              <Thumb
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                imgSrc={URL_PREFIX + thumbKey}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    )
  },
)

export default EmblaThumbs
