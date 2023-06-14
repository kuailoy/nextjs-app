import IconPrev from '@/public/arrow-left.svg'
import IconNext from '@/public/arrow-right.svg'

type PrevNextButtonPropType = {
  // enabled: boolean
  onClick: () => void
}

export const PrevButton: React.FC<PrevNextButtonPropType> = (props) => {
  const { onClick } = props
  return (
    <button
      className="embla__button absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 transition delay-75 duration-300 ease-out hover:-translate-x-2 sm:block"
      onClick={onClick}
    >
      <IconPrev width={36} height={36} fill="#38b2ac" />
    </button>
  )
}

export const NextButton: React.FC<PrevNextButtonPropType> = (props) => {
  const { onClick } = props

  return (
    <button
      className="embla__button absolute right-4  top-1/2 z-20 hidden -translate-y-1/2 transition  delay-75 duration-300 ease-out hover:translate-x-2 sm:block"
      onClick={onClick}
    >
      <IconNext width={36} height={36} fill="#38b2ac" />
    </button>
  )
}
