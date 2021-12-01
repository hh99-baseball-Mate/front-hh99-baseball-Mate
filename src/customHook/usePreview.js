import React, { useState } from "react"

export const usePreview = (preview) => {
  // 미리보기 삭제,

  console.log(preview)
  const deletePreview = () => {
    if (!preview) {
      window.alert("삭제 할 사진이 없어요")
      return
    }
    preview = ""
  }

  return [deletePreview]
}
