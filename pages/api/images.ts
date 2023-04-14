// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getDemoImage } from '@/lib/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  images: string[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const imgUrl = getDemoImage()
  res.status(200).json({
    images: [imgUrl],
  })
}
