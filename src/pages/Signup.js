import React, { useState } from "react"
import styled from "styled-components"

import { useDispatch } from "react-redux"
import { actionCreators as userActions } from "../redux/modules/user"
import { passwordCheck, emailCheck } from "../shared/LoginCheck"

import {
  Buttons,
  Inputs,
  Text,
  Container,
  Header,
  InputCheck,
} from "../components"

import { IoEyeSharp } from "react-icons/io5"
import { AiOutlineCheck } from "react-icons/ai"

export const Signup = (props) => {
  const { history } = props

  const dispatch = useDispatch()

  // 비밀번호 숨기기/보이기
  const [showPwd, setShowPwd] = useState(false)
  const [showPwd2, setShowPwd2] = useState(false)

  // 인풋 여러개쓰기
  const [inputsValue, setInputValue] = useState({
    userid: "",
    username: "",
    password: "",
    password2: "",
  })

  // 비구조화 할당
  const { userid, username, password, password2 } = inputsValue

  // name 에는 input 네임이 value 에는 그 값들이 들어감
  const onChangeValue = (e) => {
    const { name, value } = e.target
    setInputValue({
      ...inputsValue,
      [name]: value,
    })
  }

  const idCehcking = userid !== "" && emailCheck.test(userid)
  const userNameChecking = username !== ""
  const passwordChecking = password !== "" && passwordCheck.test(password)
  const password2Checking = password2 !== "" && password === password2

  const signUpChecking = () => {
    if (
      idCehcking &&
      userNameChecking &&
      passwordChecking &&
      password2Checking
    ) {
      dispatch(userActions.signUpMD({ userid, username, password }))
      console.log("가입완료")
    } else {
      window.alert("입력한 내용을 다시 확인하시기 바랍니다.")
      console.log("가입실패")
    }
  }

  return (
    <>
      <Container margin="0px auto">
        {/* 헤더 */}
        <Header
          onClick={() => {
            history.push("/login")
          }}
        >
          이메일로 가입
        </Header>

        {/* 게정생성 */}
        <div style={{ margin: "50px 0 0 0" }}>
          <Text size="20px" bold>
            계정생성
          </Text>
        </div>

        <div style={{ position: "relative" }}>
          <Inputs
            name="userid"
            type="text"
            value={userid}
            onChange={onChangeValue}
            placeholder="아이디로 사용할 이메일을 입력해주세요"
          >
            이메일
            {/* 입력체크표시 */}
            {idCehcking && <InputCheck />}
          </Inputs>
          <button
            style={{
              position: "absolute",
              right: "3px",
              bottom: "18px",
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          >
            중복확인
            <AiOutlineCheck />
          </button>
        </div>

        {/* 입력오류 문구 */}
        {!idCehcking && (
          <Text color="#FB1F07" size="9px">
            이메일 양식을 확인해주세요
          </Text>
        )}

        <Inputs
          name="username"
          type="text"
          value={username}
          onChange={onChangeValue}
          placeholder="닉네임을 입력해주세요"
        >
          닉네임
          {/* 입력체크표시 */}
          {userNameChecking && <InputCheck />}
        </Inputs>

        {/* 입력오류 문구 */}
        {!userNameChecking && (
          <Text color="#FB1F07" size="9px">
            아이디를 확인해주세요
          </Text>
        )}

        <InputPosition>
          <Inputs
            name="password"
            check
            type={showPwd ? "text" : "password"}
            value={password}
            onChange={onChangeValue}
            placeholder="영문 + 특수문자 + 숫자 포함 8글자 이상의 비밀번호를 설정해주세요."
          >
            비밀번호
            {/* 입력체크표시 */}
            {passwordChecking && <InputCheck />}
          </Inputs>

          <IoEyeSharp
            size="24"
            style={{
              position: "absolute",
              right: "10px",
              top: "50px",
            }}
            onClick={() => {
              setShowPwd(!showPwd)
            }}
          ></IoEyeSharp>
        </InputPosition>

        {/* 입력오류 문구 */}
        {!passwordChecking && (
          <Text color="#FB1F07" size="9px">
            영문 + 특수문자 + 숫자 포함 8글자 이상의 비밀번호를 설정해주세요.
          </Text>
        )}

        <InputPosition>
          <Inputs
            name="password2"
            type={showPwd2 ? "text" : "password"}
            value={password2}
            onChange={onChangeValue}
            placeholder="비밀번호를 입력해주세요"
          >
            비밀번호확인
            {/* 확인체크표시 */}
            {password2Checking && <InputCheck />}
          </Inputs>
          <IoEyeSharp
            size="24"
            style={{
              position: "absolute",
              right: "10px",
              top: "50px",
            }}
            onClick={() => {
              setShowPwd2(!showPwd2)
            }}
          ></IoEyeSharp>
        </InputPosition>

        {/* 입력오류 문구 */}
        {!password2Checking && (
          <Text color="#FB1F07" size="9px">
            비밀번호가 일치하지 않습니다.
          </Text>
        )}

        <Buttons
          margin="62px 0 0 0"
          border="1px solid #EC5E4F"
          bg="#FFFFFF"
          _onClick={signUpChecking}
        >
          <Text color="#F25343" bold>
            회원가입
          </Text>
        </Buttons>
      </Container>
    </>
  )
}

const InputPosition = styled.div`
  position: relative;
`