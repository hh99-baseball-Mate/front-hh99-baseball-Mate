import { nanoid } from "nanoid"
import { uploadFile } from "react-s3"

export const useS3Upload = (preview, path) => {
  const region = "ap-northeast-2"
  const S3_BUCKET = "meetballimg"

  const _accessKey = process.env.REACT_APP_S3_ACCESS_KEY
  const _secretAccessKey = process.env.REACT_APP_S3_SECRET_ACEESS_KEY

  // 고유 id 값으로 파일 중복을 제거

  // const id = nanoid()
  // const date = new Date().getTime()
  // const random = Math.random()
  // const fileName = date + id + random
  let fileName = preview.name

  const config = {
    bucketName: S3_BUCKET,
    region: region,
    accessKeyId: _accessKey,
    secretAccessKey: _secretAccessKey,
    dirName: `images/${path}`,
    // fileName: fileName,
  }

  const uploadFiles = async (file) => {
    console.log(file, "file")
    uploadFile(file, config)
      .then((data) => console.log(data))
      .catch((err) => console.error(err))
  }

  return [uploadFiles, fileName]
}
