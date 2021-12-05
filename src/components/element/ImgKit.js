import React from "react"

import { IKImage, IKContext } from "imagekitio-react"
import styled from "styled-components"

export const ImgKit = ({ path, fileName, width, height }) => {
  const urlEndpoint = `https://ik.imagekit.io/jaeil/images/${path}`
  const publicKey = process.env.APP_PUBLIC_KEY
  const serverUrl = process.env.REACT_APP_BASE_URL

  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      transformationPosition="path"
      authenticationEndpoint={serverUrl}
    >
      <ImgKits
        path={"/" + fileName}
        transformation={[
          {
            height: height,
            width: width,
          },
        ]}
        // loading="lazy"
        alt={fileName}
      />
    </IKContext>
  )
}

ImgKit.defaultProps = {
  path: "group",
  fileName: "basic0",
}

const ImgKits = styled(IKImage)`
  cursor: pointer;
`
