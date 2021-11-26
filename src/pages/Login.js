import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { regPassword } from "../shared/Reg"

import { Buttons, Text } from "../components"
import { Container } from "../components/Container"
import { TextField } from "../componentsLogin/TextField"
import { SocialLogin } from "../componentsLogin/SocialLogin"

import { actionCreators as userActions } from "../redux/modules/user"
import { history } from "../redux/configStore"
import LogoImg from "../shared/icon/logo/logo.png"

import { IoEyeSharp } from "react-icons/io5"
import { MdKeyboardArrowDown } from "react-icons/md"
import { Formik, Form } from "formik"
import * as Yup from "yup"

export const Login = (props) => {
  const [loginOther, setLoginOther] = useState(false)
  const [showPwd, setShowPwd] = useState(false)

  const dispatch = useDispatch()

  const validate = Yup.object({
    email: Yup.string().email("이메일 형식으로 입력해주세요.").required(""),
    password: Yup.string()
      .matches(
        regPassword,
        "영문 + 특수문자 + 숫자 포함 8글자 이상의 비밀번호를 입력해주세요."
      )
      .required(""),
  })

  return (
    <Container>
      <Logo />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validate}
      >
        {(formik) => (
          <Form>
            {/* {console.log(formik.values, "login")} */}
            <TextField
              label="이메일"
              name="email"
              type="email"
              placeholder="아이디로 사용 할 이메일을 입력해주세요(최대 20자)"
              maxLength="20"
            />

            <div style={{ position: "relative" }}>
              <TextField
                label="비밀번호"
                name="password"
                type={showPwd ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요"
                maxLength="16"
              />
              <IoEyeSharp
                size="24"
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "42px",
                }}
                onClick={() => {
                  setShowPwd(!showPwd)
                }}
              ></IoEyeSharp>
            </div>

            <Buttons
              submit
              margin="24px 0 7px 0"
              _onClick={(e) => {
                if (!formik.values.email || !formik.values.password) {
                  window.alert("입력을 확인해주세요")
                } else {
                  dispatch(
                    userActions.logInMD({
                      userid: formik.values.email,
                      password: formik.values.password,
                    })
                  )
                }
                e.target.disabled = true
              }}
            >
              로그인
            </Buttons>
            <Buttons
              margin="10px 0"
              _onClick={() => history.push("/phoneAuth")}
            >
              회원가입
            </Buttons>

            {/* 카카오로그인 */}
            <SocialLogin />
          </Form>
        )}
      </Formik>

      {/* 다른 방법 로그인 */}
      {/* <div onClick={() => setLoginOther(!loginOther)}>
        {loginOther ? (
          ""
        ) : (
          <Text center color="#777777" margin="14px 0 0 0">
            다른 방법으로 로그인 {loginOther ? "숨기기" : "보기"}{" "}
            <MdKeyboardArrowDown />
          </Text>
        )}
      </div> */}

      {/* 소셜로그인 */}
      {/* {loginOther ? <SocialLogin /> : null} */}
    </Container>
  )
}

const Logo = styled.div`
  width: 203px;
  height: 38px;
  margin: 132px auto;
  font-size: 37px;
  font-weight: 700px;
  text-align: center;
  background-image: url(${LogoImg});
`
