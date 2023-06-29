import Content from '@/components/Content'
import getAllSourceKeys, { AllData, createData } from '@/lib/getSourceKeys'
import type { NextPageContext } from 'next'
import Head from 'next/head'
import { useMemo, useState } from 'react'

interface HomeProps {
  allData: AllData
}

export default function Demo({ allData, ...props }: HomeProps) {
  const [category, setCategory] = useState('kk')
  const data = useMemo(() => allData[category], [allData, category])

  return (
    <>
      <Head>
        <title>Han Ding</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-full">
        <Content category={category} data={data} />
      </main>
    </>
  )
}

export async function getStaticProps({ req }: NextPageContext) {
  const sourceKeys = await getAllSourceKeys()
  const allData = await createData(sourceKeys)
  return {
    props: {
      allData,
    },
  }
}
