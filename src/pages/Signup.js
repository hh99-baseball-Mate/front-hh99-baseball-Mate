import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { Buttons } from "../elements/Buttons"
import { Inputs } from "../elements/Inputs"
import { actionCreators as userActions } from "../redux/modules/user"

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

  return (
    <>
      <Inputs
        type="text"
        value={userid}
        _onChange={(e) => {
          setUserId(e.target.value)
        }}
        placeholder="아이디를 입력해주세요"
      ></Inputs>
      <Inputs
        type="text"
        value={username}
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
          dispatch(userActions.sign_up_md({ userid, username, password }))
        }}
      >
        가입하기
      </Buttons>
    </>
  )
}
