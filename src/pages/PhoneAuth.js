import React, { useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { ArrowBack, Buttons, Container, Inputs } from "../components"
import { history } from "../redux/configStore"
import { actionCreators as userActions } from "../redux/modules/user"
import { regPhone } from "../shared/reg"

export const PhoneAuth = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [phoneAuth, setPhoneAuth] = useState("")
  const dispatch = useDispatch()


  const PhoneAuthNum = (e) => {
    setPhoneNumber(e.target.value)
  }

  const PhoneAuthSubmit = (e) => {
    setPhoneAuth(e.target.value)
  }

  const authNumber = (e) => {
    if (
      phoneNumber &&
      regPhone.test(phoneNumber) &&
      phoneNumber.length === 11
    ) {
      dispatch(userActions.PhoneAuthSubmitMD(phoneNumber))
      e.target.disabled = true
      return
    }

    window.alert("입력하신 휴대번호를 확인 해주세요")
  }

  const phoneSubmit = () => {
    phoneAuth.length === 5
      ? dispatch(userActions.PhoneAuthConfirmMD({ phoneNumber, phoneAuth }))
      : window.alert("인증번호를 입력해주세요")
  }

  return (
    <>
      <Container>
        <ArrowBack>회원가입</ArrowBack>
        <AuthBox>
          <Inputs
            placeholder="'-'구분없이 입력하세요"
            width="80%"
            maxLength="11"
            value={phoneNumber}
            onChange={PhoneAuthNum}
          >
            휴대폰 번호
          </Inputs>
          <Btn onClick={authNumber}>인증번호</Btn>
        </AuthBox>

        {/* 인증번호 input */}
        <div style={{ marginTop: "30px" }}>
          <Inputs
            placeholder="인증번호 입력하세요"
            value={phoneAuth}
            onChange={PhoneAuthSubmit}
            maxLength="5"
          >
            인증번호
          </Inputs>
        </div>

        {/* 버튼  그룹*/}
        <BtnGroup>
          <Buttons margin="0 16px 0 0" _onClick={() => history.goBack()}>
            취소
          </Buttons>
          <Buttons margin="0" submit _onClick={phoneSubmit}>
            확인
          </Buttons>
        </BtnGroup>
      </Container>
    </>
  )
}

const AuthBox = styled.div`
  margin-top: 30px;
  display: flex;
  position: relative;
`

const BtnGroup = styled.div`
  margin-top: 30px;
  display: flex;
`

const Btn = styled.button`
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 5px;
  width: 74px;
  height: 30px;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  line-height: 2;
  cursor: pointer;
  position: absolute;
  right: 0px;
  bottom: 10px;
  background-color: #333333;
  color: #fff;
`
