import {
  GetObjectCommand,
  ListObjectsV2Command,
  S3Client,
} from '@aws-sdk/client-s3'

const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, BUCKET_NAME } =
  process.env

const client = new S3Client({ region: AWS_REGION })

export const getObjectsKeys = async ({
  bucket = BUCKET_NAME,
  folderName,
}: {
  bucket?: string
  folderName: string
}) => {
  try {
    const listObjectCommand = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: folderName,
    })
    const listResponse = await client.send(listObjectCommand)
    const objects = listResponse.Contents?.map((c) => c.Key)

    return objects
  } catch (err) {
    console.error(err)
  }
}

export const getObject = async ({
  bucket = BUCKET_NAME,
  key,
}: {
  key: string
  bucket?: string
}) => {
  const param = {
    Bucket: bucket,
    Key: key,
  }
  const command = new GetObjectCommand(param)
  const { Body } = await client.send(command)
  const base64 = 'data:image/jpeg;base64,' + await Body?.transformToString('base64')
  console.log('base64: ', base64);
  return base64
}

// export const getObjectUrl = ({
//   bucket = BUCKET_NAME,
//   key,
// }: {
//   key: string
//   bucket?: string
// }) => {
//   const param = {
//     Bucket: bucket,
//     Key: key,
//   }
//   const command = new GetObjectCommand(param)
//   return getSignedUrl(client as any, command as any, { expiresIn: 3600 })
// }
