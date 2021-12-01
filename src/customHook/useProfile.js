import React from "react"

export const useProfile = (usertype, userImage) => {
  // 유저타입에 따른 사진 커스텀훅

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
