import React from "react"
import { Image } from "react-bootstrap"
import { TiDelete } from "react-icons/ti"
import styled from "styled-components"

export const Preview = (props) => {
  return (
    <>
      <PreviewBox>
        <Image
          style={{ width: "82px", height: "88px", borderRadius: "8px" }}
          src={props.src}
        />
        <TiDelete
          size="16"
          color="#333333"
          style={{
            position: "absolute",
            margin: "-8px",
          }}
          onClick={props.onClick}
        ></TiDelete>
      </PreviewBox>
    </>
  )
}

Preview.defaultProps = {
  children: null,
  src: null,
}

const PreviewBox = styled.div`
  position: relative;
`
