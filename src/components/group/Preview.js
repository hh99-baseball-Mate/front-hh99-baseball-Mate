import React, { memo } from "react"
import { Image } from "react-bootstrap"
import { AiOutlineClose } from "react-icons/ai"
import styled from "styled-components"

export const Preview = memo((props) => {
  return (
    // 미리보기 사진
    <>
      <PreviewBox>
        <Image
          style={{ width: "82px", height: "82px", borderRadius: "8px" }}
          src={props.src}
        />
        <AiOutlineClose
          size="16"
          color="#333333"
          style={{
            position: "absolute",
            margin: "-8px",
          }}
          onClick={props.onClick}
        ></AiOutlineClose>
      </PreviewBox>
    </>
  )
})

Preview.defaultProps = {
  children: null,
  src: null,
}

const PreviewBox = styled.div`
  position: relative;
`
