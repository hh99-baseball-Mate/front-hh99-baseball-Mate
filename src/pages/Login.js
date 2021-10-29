import React, { useState } from "react"
import { history } from "../redux/configStore"
import { Inputs, Buttons, Text } from "../componentsLogin/"
import { useDispatch } from "react-redux"
import { actionCreators as userActions } from "../redux/modules/user"
import { kakaoUrl } from "../shared/SocialLogin/Kakao"
import { MdKeyboardArrowDown } from "react-icons/md"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { emailCheck, passwordCheck } from "../shared/LoginCheck"

export const Login = (props) => {
  const [loginOther, setLoginOther] = useState(false)

  const [inputValue, setInputValue] = useState({
    userid: "",
    password: "",
  })

  const { userid, password } = inputValue

  const idCehcking = userid !== "" && emailCheck.test(userid)
  const passwordChecking = password !== "" && passwordCheck.test(password)

  const onChangeValue = (e) => {
    const { name, value } = e.target
    setInputValue({
      ...inputValue,
      [name]: value,
    })
  }

  const dispatch = useDispatch()

  return (
    <>
      {/* 헤더 */}
      <div>
        <div
          style={{
            width: "278px",
            height: "58px",
            margin: "132px auto",
            fontSize: "37px",
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          야구메이트
        </div>
      </div>

      {/* 로그인 인풋창 / 버튼 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          maxWidth: "335px",
          margin: "0 auto",
        }}
      >
        <div style={{ margin: "25px  0" }}>
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
              {idCehcking && (
                <AiOutlineCheckCircle
                  size="16px"
                  style={{ margin: "0px 5px" }}
                  color="#F25343"
                />
              )}
            </Inputs>
          </div>

          {/* 입력오류 문구 */}
          {!idCehcking && (
            <Text color="#FB1F07" size="9px">
              이메일 양식을 확인해주세요
            </Text>
          )}
        </div>

        <Inputs
          name="password"
          check
          type="password"
          value={password}
          onChange={onChangeValue}
          placeholder="영문 + 특수문자 + 숫자 포함 8글자 이상의 비밀번호를 설정해주세요."
        >
          비밀번호
          {/* 입력체크표시 */}
          {passwordChecking && (
            <AiOutlineCheckCircle
              size="16px"
              style={{ margin: "0px 5px" }}
              color="#F25343"
            />
          )}
        </Inputs>

        {/* 입력오류 문구 */}
        {!passwordChecking && (
          <Text color="#FB1F07" size="9px">
            영문 + 특수문자 + 숫자 포함 8글자 이상의 비밀번호를 설정해주세요.
          </Text>
        )}

        <Buttons
          margin="24px 0 7px 0"
          bg="#F25343"
          border="1px solid #F25343"
          _onClick={() => {
            // history.push("/clubchoice")
            dispatch(
              userActions.logInMD({
                userid,
                password,
              })
            )
          }}
        >
          <Text color="#fff" bold>
            로그인
          </Text>
        </Buttons>
        <Buttons
          border="1px solid #EC5E4F"
          bg="#FFFFFF"
          _onClick={() => history.push("/signup")}
        >
          <Text color="#F25343" bold>
            회원가입
          </Text>
        </Buttons>

        <div
          onClick={() => {
            setLoginOther(!loginOther)
          }}
        >
          {loginOther ? (
            ""
          ) : (
            <Text center color="#777777" margin="14px 0 0 0">
              다른 방법으로 로그인 {loginOther ? "숨기기" : "보기"}{" "}
              <MdKeyboardArrowDown />
            </Text>
          )}
        </div>
      </div>

      {/* 소셜로그인 */}
      {loginOther ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "90%",
              maxWidth: "335px",
              margin: "0 auto",
            }}
          >
            <Buttons bg="#4DBF39" _onClick={() => history.push("/signup")}>
              <Text color="#fff" bold>
                네이버로 로그인
              </Text>
            </Buttons>
            <Buttons
              bg="#FAE100"
              _onClick={() => {
                console.log("됨?")
                window.location.href = kakaoUrl
              }}
            >
              <Text color="#3C1D1E" bold>
                카카오톡으로 로그인
              </Text>
            </Buttons>
            <Buttons bg="#1877F2" _onClick={() => history.push("/signup")}>
              <Text color="#fff" bold>
                페이스북으로 로그인
              </Text>
            </Buttons>
          </div>
        </>
      ) : null}

      <button
        style={{ width: "40px", height: "40px" }}
        onClick={() => {
          history.push("/clubchoice")
        }}
      >
        구단선택
      </button>
    </>
  )
}
