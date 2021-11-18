import React, { useState } from "react"

export const usePreview = (initialPreview = "") => {
  const [preview, setPreview] = useState(initialPreview)

  // 미리보기
  const imgPreview = (e) => {
    setPreview(e.target.files[0])
  }

  // 미리보기 삭제,

  const deletePreview = () => {
    if (!preview) {
      window.alert("삭제 할 사진이 없어요")
      return
    }
    setPreview("")
  }

  return [imgPreview, deletePreview, preview]
}
