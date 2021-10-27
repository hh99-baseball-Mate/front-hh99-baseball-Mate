import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { Buttons } from "../elements/Buttons"
import { Inputs } from "../elements/Inputs"
import { actionCreators as userActions } from "../redux/modules/user"
import { IoEyeSharp } from "react-icons/io5"
import {
  AiOutlineArrowLeft,
  AiOutlineCheckCircle,
  AiOutlineCheck,
} from "react-icons/ai"
import { Text } from "../elements/Text"
import Button from "@restart/ui/esm/Button"
import styled from "styled-components"
import { history } from "../redux/configStore"

export const Signup = (props) => {
  const dispatch = useDispatch()

  // 비밀번호 숨기기/보이기
  const [showPwd, setShowPwd] = useState(false)
  const [showPwd2, setShowPwd2] = useState(false)

  // 로그인정보
  const [userid, setUserId] = useState("")
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  // 입력 확인
  const [idCheck, setIdCheck] = useState(false)
  const [nameCheck, setNameCheck] = useState(false)
  const [passwordCheck, setIdPasswordCheck] = useState(false)

  // const userIdCheck = () => {

  // }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          margin: "30px auto",
          maxWidth: "335px",
        }}
      >
        {/* 헤더 */}
        <div style={{ position: "relative" }}>
          <AiOutlineArrowLeft
            style={{ position: "absolute" }}
            onClick={() => {
              history.push("/login")
            }}
          />
          <Text size="16px" center>
            {" "}
            이메일로 회원가입
          </Text>
        </div>

        {/* 게정생성 */}
        <div style={{ margin: "50px 0 0 0" }}>
          <Text size="20px" bold>
            계정생성
          </Text>
        </div>

        <div style={{ margin: "25px 0 0 0" }}>
          <Text>
            이메일 <AiOutlineCheckCircle size="16px" />
          </Text>
          <div style={{ position: "relative" }}>
            <Inputs
              type="text"
              value={userid}
              _onChange={(e) => {
                setUserId(e.target.value)
              }}
              placeholder="아이디로 사용할 이메일을 입력해주세요"
            />
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
        </div>

        <InputBox>
          <Text>
            닉네임 <AiOutlineCheckCircle size="16px" />
          </Text>
          <Inputs
            type="text"
            value={username}
            _onChange={(e) => {
              setUserName(e.target.value)
            }}
            placeholder="닉네임을 입력해주세요"
          ></Inputs>
        </InputBox>

        <InputBox>
          <Text>비밀번호</Text>
          {showPwd ? (
            <Inputs
              type="text"
              value={password}
              _onChange={(e) => {
                setPassword(e.target.value)
              }}
              placeholder="비밀번호를 입력해주세요"
            ></Inputs>
          ) : (
            <Inputs
              type="password"
              value={password}
              _onChange={(e) => {
                setPassword(e.target.value)
              }}
              placeholder="비밀번호를 입력해주세요"
            ></Inputs>
          )}
          <IoEyeSharp
            size="24"
            style={{
              position: "absolute",
              right: "10px",
              top: "30px",
            }}
            onClick={() => {
              setShowPwd(!showPwd)
            }}
          ></IoEyeSharp>
        </InputBox>

        {/* </div> */}

        <InputBox>
          <Text>
            비밀번호 확인 <AiOutlineCheckCircle size="16px" />
          </Text>
          {showPwd2 ? (
            <Inputs
              type="text"
              value={password2}
              _onChange={(e) => {
                setPassword2(e.target.value)
              }}
              placeholder="비밀번호를 입력해주세요"
            ></Inputs>
          ) : (
            <Inputs
              value={password2}
              _onChange={(e) => {
                setPassword2(e.target.value)
              }}
              type="password"
              placeholder="비밀번호를 입력해주세요"
            ></Inputs>
          )}
          <IoEyeSharp
            size="24"
            style={{
              position: "absolute",
              right: "10px",
              top: "30px",
            }}
            onClick={() => {
              setShowPwd2(!showPwd2)
            }}
          ></IoEyeSharp>
        </InputBox>

        <Buttons
          margin="62px 0 0 0"
          border="1px solid #EC5E4F"
          bg="#FFFFFF"
          _onClick={() => {
            dispatch(userActions.sign_up_md({ userid, username, password }))
          }}
        >
          <Text color="#F25343" bold>
            회원가입
          </Text>
        </Buttons>
      </div>
    </>
  )
}

const InputBox = styled.div`
  position: relative;
  margin: 20px 0 0 0;
`