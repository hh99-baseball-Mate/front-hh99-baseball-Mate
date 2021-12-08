import React from "react"

import { IKImage, IKContext } from "imagekitio-react"
import styled from "styled-components"

export const ImgKit = ({ path, fileName, width, height, cmMode }) => {
  const urlEndpoint = `https://ik.imagekit.io/jaeil/images/${path}`
  const publicKey = process.env.APP_PUBLIC_KEY
  const serverUrl = process.env.REACT_APP_BASE_URL

  if (cmMode) {
    return (
      <IKContext
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        transformationPosition="path"
        authenticationEndpoint={serverUrl}
      >
        <CmKits
          path={"/" + fileName}
          transformation={[
            {
              height: height,
              width: width,
              cropMode: "pad_resize",
            },
          ]}
          lqip={{ active: true, quality: 50 }}
          loading="lazy"
          alt="이미지없음"
        />
      </IKContext>
    )
  }
  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      transformationPosition="path"
      authenticationEndpoint={serverUrl}
    >
      <BasicKits
        path={"/" + fileName}
        transformation={[
          {
            height: height,
            width: width,
          },
        ]}
        lqip={{ active: true, quality: 20 }}
        loading="lazy"
        alt="이미지없음"
      />
    </IKContext>
  )
}

ImgKit.defaultProps = {
  cmMode: false,
}

ImgKit.defaultProps = {
  path: "group",
  fileName: "basic0",
}

const CmKits = styled(IKImage)`
  cursor: pointer;
  width: 100%;
`

const BasicKits = styled(IKImage)`
  cursor: pointer;
`