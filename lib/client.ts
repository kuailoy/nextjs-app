
const qiniu = require('qiniu')

const { ACCESS_KEY_ID, ACCESS_KEY_SECRET, DEFAULT_BUCKET, PUBLIC_DOMAIN } = process.env
const mac = new qiniu.auth.digest.Mac(ACCESS_KEY_ID, ACCESS_KEY_SECRET)
const config = new qiniu.conf.Config();
console.log('config: ', config);
const bucketManager = new qiniu.rs.BucketManager(mac, config);

export function getDemoImage() {
  try {
    const publicDownloadUrl = bucketManager.publicDownloadUrl(PUBLIC_DOMAIN, 'demo/naonao_interlace.jpg');
    // const signUrl = client.signatureUrl('demo/DSCF0407.JPG', { expires: 600, process: 'image/resize,w_300', interlace: 1 });
    // const signUrl = client.signatureUrl('demo/DSCF0407.JPG', {
    //   expires: 600,
    //   interlace: 1,
    // })
    // console.log("signUrl="+signUrl);
    // 列举当前账号所有地域下的存储空间。
    // const result = await client.listBuckets();
    // console.log({signUrl});
    return publicDownloadUrl
    // return '../public/next.svg'
  } catch (err) {
    console.log(err)
  }
}

// export async function listImages() {
//   try {
//     const result = client.list({
//       prefix: 'demo/',
//     });
//     return result;
//   } catch (err) {
//     console.log(err);
//   }
// }

// export async function listBuckets() {
//   try {
//     // 列举当前账号所有地域下的存储空间。
//     const result = await client.listBuckets();
//     return result;
//   } catch (err) {
//     console.log(err);
//   }
// }
