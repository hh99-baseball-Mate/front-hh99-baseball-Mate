import React from "react"
import { useSelector } from "react-redux"

export const useProfile = (usertype, userImage) => {
  // const = useSelector((state) => state.user.user_info)

  const userImg = () => {
    if (usertype === "normal") {
      return process.env.REACT_APP_IMAGES_BASE_URL + userImage
    }
    if (usertype === "kakao") {
      return userImage
    }
    return
  }

  return [userImg]
}
