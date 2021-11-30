import React, { useState } from "react"
import AWS from "aws-sdk"
import { nanoid } from "nanoid"

export const useS3Upload = (preview, path) => {
  const _accessKey = process.env.REACT_APP_S3_ACCESS_KEY
  const _secretAccessKey = process.env.REACT_APP_S3_SECRET_ACEESS_KEY

  const region = "ap-northeast-2"
  const S3_BUCKET = "meetball.shop"

  const [progress, setProgress] = useState(0)

  console.log(preview, path)

  // 고유 id 값으로 파일 중복을 제거

  const id = nanoid()
  const date = new Date().getTime()
  const random = Math.random()
  const fileName = date + id + random

  AWS.config.update({
    accessKeyId: _accessKey,
    secretAccessKey: _secretAccessKey,
  })

  const myBucket = new AWS.S3({
    params: {
      Bucket: S3_BUCKET,
    },
    region: region,
  })

  const uploadFile = (file) => {
    if (!file) {
      return
    }

    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: `images/${path}/` + fileName,
    }

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100))
        setProgress(null)
      })
      .send((err) => {
        if (err) console.log(err, "s3업로드 에러")
      })
  }
  console.log(preview)
  // return <div>AWS 업로드</div>
  return [uploadFile, fileName]
}
