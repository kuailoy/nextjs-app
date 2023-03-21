const OSS = require('ali-oss');
const { REGION, ACCESS_KEY_ID, ACCESS_KEY_SECRET, DEFAULT_BUCKET } = process.env;

const client = new OSS({
  region: REGION,
  accessKeyId: ACCESS_KEY_ID,
  accessKeySecret: ACCESS_KEY_SECRET,
  bucket: DEFAULT_BUCKET,
});

// export default client;

export async function getImage() {
  try {
    const signUrl = client.signatureUrl('demo/DSCF0407.JPG', { expires: 600, process: 'image/resize,w_300' });
    // console.log("signUrl="+signUrl);
    // 列举当前账号所有地域下的存储空间。
    // const result = await client.listBuckets();
    // console.log({signUrl});
    return signUrl;
  } catch (err) {
    console.log(err);
  }
}

export async function listImages() {
  try {
    const result = client.list({
      prefix: 'demo/',
    });
    return result;
  } catch (err) {
    console.log(err);
  }
}

export async function listBuckets() {
  try {
    // 列举当前账号所有地域下的存储空间。
    const result = await client.listBuckets();
    return result;
  } catch (err) {
    console.log(err);
  }
}
