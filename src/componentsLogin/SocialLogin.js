import React from "react"
import { Buttons, Text } from "../components"
import { history } from "../redux/configStore"
import { kakaoUrl } from "../shared/SocialLogin/Kakao"

export const SocialLogin = () => {
  return (
    <>
      <Buttons social bg="#4DBF39" _onClick={() => history.push("/signup")}>
        <Text color="#fff" bold>
          네이버로 로그인
        </Text>
      </Buttons>
      <Buttons
        social
        bg="#FAE100"
        _onClick={() => {
          window.location.href = kakaoUrl
        }}
      >
        <Text color="#3C1D1E" bold>
          카카오톡으로 로그인
        </Text>
      </Buttons>
      <Buttons social bg="#1877F2" _onClick={() => history.push("/signup")}>
        <Text color="#fff" bold>
          페이스북으로 로그인
        </Text>
      </Buttons>
    </>
  )
}
