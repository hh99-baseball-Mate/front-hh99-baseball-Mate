import React, { memo } from "react"
import { TiDelete } from "react-icons/ti"

export const PreviewDelete = memo((props) => {
  return (
    // 미리보기 삭제 icon
    <>
      <TiDelete
        size="16"
        color="#333333"
        style={{
          position: "absolute",
          margin: "-8px",
        }}
      ></TiDelete>
    </>
  )
})
