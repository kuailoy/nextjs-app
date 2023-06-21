// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getObjectBuffer, getObjectsKeys } from '@/lib/client'
import { getPlaiceholder } from 'plaiceholder'

type Entity = {
  source: string
  blur: string
  thumb: string
}

export type Data = {
  [key: string]: Entity
}

export type AllData = {
  [key: string]: Data
}

const categories = ['family', 'kk']

export type AllSources = {
  [key: string]: string[]
}

async function getAllSourceKeys() {
  const values: AllSources = {}

  for (const category of categories) {
    const sources = (await getObjectsKeys({
      folderName: `${category}/source`,
    })) as string[]
    values[category] = sources
  }

  return values
}
export default getAllSourceKeys

export async function createData(allSources: AllSources) {
  const result: AllData = {}

  for (const category of categories) {
    const data: Data = {}
    const sources = allSources[category]

    for (const key of sources) {
      const source = key
      const thumb = key.replace('/source/', '/thumb/')
      const { base64, img } = await getImage(key)
      data[key] = {source, thumb, blur: base64}
    }
    result[category] = data
  }
  return result
}

async function getImage(key: string) {
  const buffer = await getObjectBuffer({ key })

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10, format: ['jpg'] })

  return {
    ...plaiceholder,
    img: { src: key, height, width },
  }
}
