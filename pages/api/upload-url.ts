// import S3 from '@aws-sdk/clients/s3'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const s3 = new S3({
  //   apiVersion: '2006-03-01',
  // })

  // const post = await s3.createPresignedPost({
  //   Bucket: process.env.BUCKET_NAME,
  //   Fields: {
  //     key: req.query.file,
  //     'Content-Type': req.query.fileType,
  //   },
  //   Expires: 60, // seconds
  //   Conditions: [
  //     ['content-length-range', 0, 104857600], // up to 100 MB
  //   ],
  // })

  // res.status(200).json(post)
  res.status(200)
}
