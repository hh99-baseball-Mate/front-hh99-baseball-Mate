import React from "react"
import { useSelector } from "react-redux"

export const useProfile = () => {
  const user_info = useSelector((state) => state.user.user_info)

  const userImg = () => {
    if (user_info.usertype === "normal") {
      return process.env.REACT_APP_IMAGES_BASE_URL + user_info.picture
    }
    if (user_info.usertype === "kakao") {
      return user_info.picture
    }
  }

  return [userImg]
}
