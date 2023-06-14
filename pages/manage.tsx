// import { UploadOutlined } from '@ant-design/icons'
// import { Button, Upload } from 'antd'
// import type { UploadProps } from 'antd/es/upload/interface'
// import { nanoid } from 'nanoid'

// const props: UploadProps = {
//   // data的返回值，上传文件时会作为file的额外参数
//   data: async (file) => {
//     const fileExt = file.name.split('.').pop()
//     // filename将作为对象存储中的key，要保证唯一性
//     // 沿用扩展名是方便下载和使用
//     const filename = encodeURIComponent(nanoid() + '.' + fileExt)
//     const fileType = encodeURIComponent(file.type as string)

//     const res = await fetch(
//       `/api/upload-url?file=${filename}&fileType=${fileType}`,
//     )
//     const { fields } = await res.json()
//     return fields
//   },
//   beforeUpload: (file) => {
//     /**
//      * 上传前的处理
//      * 1. 压缩图片
//      * 2. 修改图片为渐进式编码
//      * 3. 生成blur图，上传base64 (考虑通过Lamda函数实现）
//      * 5. 生成上传路径
//      */
//   }
// }

// const Manage = () => {
//   return (
//     <div className="container mx-auto mt-4 max-w-5xl">
//       <Upload
//         action="https://s3.ap-northeast-1.amazonaws.com/photos-handing"
//         listType="picture"
//         multiple
//         {...props}
//       >
//         <Button icon={<UploadOutlined />}>Upload</Button>
//       </Upload>
//     </div>
//   )
// }

// export default withPageAuthRequired(Manage as any, {
//   onRedirecting: () => <div>loading...</div>,
//   onError: (error) => <div>{error.message}</div>,
// })

export default function Manage() {
  return <div>mangage</div>
}
