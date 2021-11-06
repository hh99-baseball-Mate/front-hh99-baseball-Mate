import React from "react"
import { ArrowBack, Buttons, Container, Inputs } from "../components"
import { history } from "../redux/configStore"

export const PhoneAuth = () => {
  return (
    <>
      <Container>
        <ArrowBack>회원가입</ArrowBack>
        <div style={{ marginTop: "30px" }}>
          <Inputs placeholder="'-'구분없이 입력하세요">휴대폰 번호</Inputs>
        </div>
        <div style={{ marginTop: "30px" }}>
          <Inputs placeholder="인증번호 입력하세요">인증번호</Inputs>
        </div>
        <div style={{ marginTop: "130px", display: "flex" }}>
          <Buttons margin="0 16px 0 0" _onClick={() => history.goBack()}>
            취소
          </Buttons>
          <Buttons
            margin="0"
            submit
            _onClick={() => history.replace("/signup")}
          >
            확인
          </Buttons>
        </div>
      </Container>
    </>
  )
}
