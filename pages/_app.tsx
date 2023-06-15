import fetchJson from '@/lib/fetchJson'
import '@/styles/embla.css'
import '@/styles/globals.css'

import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          console.error(err)
        },
      }}
    >
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
    </SWRConfig>
  )
}
