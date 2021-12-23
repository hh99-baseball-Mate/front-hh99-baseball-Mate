import React from "react"

export const useProfile = (usertype, imgPath) => {
  // 로그인 타입(카카오, 일반)에 따라 유저 프로필사진 경로설정

  const userImg = () => {

    // 로그인 했을 때 프로필사진 체크
    if (usertype === "normal") {
      return process.env.REACT_APP_S3_USER_PROFILE_URL + imgPath
    }
    if (usertype === "kakao") {
      return imgPath
    }
    return
  }

  return [userImg]
}