import { debounce } from 'lodash'
import { useEffect, useState } from 'react'

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState<number | null>(null)

  useEffect(() => {
    const getWindowWidth = () => {
      let width: number
      if (typeof window !== 'undefined') {
        width = window.innerWidth || document.documentElement.clientWidth
        setWindowWidth(width)
      }
    }

    const debouncedResizeHandler = debounce(getWindowWidth, 150)

    getWindowWidth()

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', debouncedResizeHandler)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', debouncedResizeHandler)
      }
    }
  }, [])

  return windowWidth
}

export default useWindowWidth
