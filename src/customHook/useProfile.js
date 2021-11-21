import React from "react"
import { useSelector } from "react-redux"

export const useProfile = () => {
  const user_info = useSelector((state) => state.user.user_info)

  const ImgUrl = process.env.REACT_APP_IMAGES_BASE_URL + user_info.picture

  return [ImgUrl]
}
