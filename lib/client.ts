import {
  GetObjectCommandOutput,
  GetObjectCommand,
  ListObjectsV2Command,
  S3Client,
} from '@aws-sdk/client-s3'
import { Readable } from "stream";
// import { toNodeReadable } from "@aws-sdk/util-stream-node";

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
      Bucket: bucket,
      Prefix: folderName,
    })
    const listResponse = await client.send(listObjectCommand)
    const objects = listResponse.Contents?.map((c) => c.Key)

    return objects
  } catch (err) {
    console.error(err)
  }
}

export const getObjectBuffer = async ({
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
  // const { Body } = await client.send(command)
  const getObjectResponse: GetObjectCommandOutput = await client.send(command);
  const bodyBuffer: Buffer = await streamToBuffer(getObjectResponse.Body as Readable);
  // const base64 = 'data:image/jpeg;base64,' + await Body?.transformToString('base64')
  // return base64
  return bodyBuffer
}


function streamToBuffer(stream: Readable): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk: Buffer) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });
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
