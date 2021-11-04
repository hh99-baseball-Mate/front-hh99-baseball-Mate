import React, { useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"

import { Buttons, Text } from "../../components"
import { Container } from "../../components/Container"

import { MdKeyboardArrowDown } from "react-icons/md"
import { Formik, Form, useFormik } from "formik"
import * as Yup from "yup"
import { TextField } from "../../componentsLogin/TextField"
import { SocialLogin } from "../../componentsLogin/SocialLogin"
import { history } from "../../redux/configStore"
import { actionCreators as userActions } from "../../redux/modules/user"

export const Login = (props) => {
  // const { history } = props

  const [loginOther, setLoginOther] = useState(false)

  const dispatch = useDispatch()

  const validate = Yup.object({
    email: Yup.string()
      .email("아이디로 사용할 이메일을 입력해주세요")
      .required("이메일을 입력해주세요"),
    password: Yup.string()
      .min(
        8,
        "영문 + 특수문자 + 숫자 포함 8글자 이상의 비밀번호를 설정해주세요."
      )
      .max(
        16,
        "영문 + 특수문자 + 숫자 포함 8글자 이상의 비밀번호를 설정해주세요."
      )
      .required("이메일을 입력해주세요"),
  })

  console.log(validate)
  console.log("dd", validate)
  return (
    <Container>
      <Logo>야구메이트</Logo>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validate}
      >
        {(formik) => (
          <Form>
            <TextField
              label="이메일"
              name="이메일"
              type="email"
              placeholder="아이디로 사용 할 이메일을 입력해주세요"
            />
            {/* {formik.touched.email && formik.errors.email ? (
              <Text color="#FB1F07" size="9px">
                {formik.errors.email}
              </Text>
            ) : null} */}
            <TextField
              label="비밀번호"
              name="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해주세요"
            />
            {/* {formik.touched.password && formik.errors.password ? (
              <Text color="#FB1F07" size="9px">
                {formik.errors.password}
              </Text>
            ) : null} */}
            <Buttons
              submit
              margin="24px 0 7px 0"
              _onClick={(initialValues) => {
                dispatch(
                  userActions.logInMD({
                    userid: initialValues.email,
                    password: initialValues.password,
                  })
                )
              }}
            >
              로그인
            </Buttons>
            <Buttons _onClick={() => history.push("/signup")}>회원가입</Buttons>
          </Form>
        )}
      </Formik>

      {/* 다른 방법 로그인 */}
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

      {/* 소셜로그인 */}
      {loginOther ? <SocialLogin /> : null}
    </Container>
  )
}

const Logo = styled.div`
  width: 278px;
  height: 58px;
  margin: 132px auto;
  font-size: 37px;
  font-weight: 700px;
  text-align: center;
`
