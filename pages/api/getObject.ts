// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getObject } from '@/lib/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const data = await getObject({ key: req.query.key as string })

  console.log('req.query.key: ', req.query.key)
  res.status(200).json({ data })
}
