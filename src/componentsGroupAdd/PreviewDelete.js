import React from "react"
import { TiDelete } from "react-icons/ti"

export const PreviewDelete = () => {
  return (
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
}
