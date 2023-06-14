// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getObjectsKeys } from '@/lib/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  sourceKeys: (string | undefined)[] | undefined
  // blurKeys: (string | undefined)[] | undefined
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const sourceKeys = await getObjectsKeys({
    folderName: req.query.folderName as string,
  })
  // const blurKeys = sourceKeys?.map((key) => key!.replace('/source/', '/blur/'))
  // const thumbKeys = sourceKeys?.map((key) => key!.replace('/source/', '/thumb/'))

  res.status(200).json({
    sourceKeys,
    // blurKeys,
  })
}
