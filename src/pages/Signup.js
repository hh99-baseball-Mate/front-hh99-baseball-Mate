import React, { useState } from "react"
import { Buttons } from "../elements/Buttons"
import { Inputs } from "../elements/Inputs"

export const Signup = (props) => {
  const [showPwd, setShowPwd] = useState(false)
  const [showPwd2, setShowPwd2] = useState(false)

  const [user_id, setUserId] = useState("")
  const [user_name, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  return (
    <>
      <Inputs
        type="text"
        value={user_id}
        _onChange={(e) => {
          setUserId(e.target.value)
        }}
        placeholder="아이디를 입력해주세요"
      ></Inputs>
      <Inputs
        type="text"
        value={user_name}
        _onChange={(e) => {
          setUserName(e.target.value)
        }}
        placeholder="닉네임을 입력해주세요"
      ></Inputs>

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
      <button
        onClick={() => {
          setShowPwd(!showPwd)
        }}
      >
        비번 보기
      </button>

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
      <button
        onClick={() => {
          setShowPwd2(!showPwd2)
        }}
      >
        비번 보기
      </button>

      <Buttons
        _onClick={() => {
          console.log(user_id, user_name, password, password2)
        }}
      >
        가입하기
      </Buttons>
    </>
  )
}
