import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { regPassword } from "../shared/reg";

import { Buttons, Text, Container, ArrowBack } from "../components";

import { IoEyeSharp } from "react-icons/io5";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { TextField } from "../componentsLogin/TextField";
import { history } from "../redux/configStore";

export const Signup = (props) => {
  const user_info = useSelector((state) => state.user.user_info);
  const is_auth = useSelector((state) => state.user.is_auth);

  const dispatch = useDispatch();

  const validate = Yup.object({
    email: Yup.string().email("이메일 형식으로 입력해주세요.").required(""),
    userName: Yup.string().required(""),
    password: Yup.string()
      .matches(
        regPassword,
        "영문 + 특수문자 + 숫자 포함 8글자 이상의 비밀번호를 설정해주세요."
      )
      .required(""),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
      .required(""),
  });

  // 비밀번호 숨기기/보이기
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);

  useEffect(() => {
    // 핸드폰 인증번호를 안할 시 인증하러 보냄
    if (!is_auth) {
      window.alert("번호 인증을 먼저 해주세요");
      history.replace("/phoneAuth");
      return;
    }
  }, []);

  return (
    <Container>
      {/* 헤더 */}
      <ArrowBack>이메일로 가입</ArrowBack>

      {/* 게정생성 */}
      <div style={{ margin: "50px 0 0 0" }}>
        <Text size="20px" bold>
          계정생성
        </Text>
      </div>

      <Formik
        initialValues={{
          email: "",
          userName: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validate}
      >
        {(formik) => (
          <Form>
            {/* {console.log(formik.values, "signup")} */}
            <TextField
              label="이메일"
              name="email"
              type="email"
              placeholder="이메일을 입력해주세요"
              maxLength="100"
            ></TextField>

            <TextField
              label="닉네임"
              name="userName"
              type="text"
              placeholder="닉네임을 입력해주세요(최대 7자)"
              maxLength="7"
            ></TextField>

            <InputPosition>
              <TextField
                label="비밀번호"
                name="password"
                check
                type={showPwd ? "text" : "password"}
                placeholder="영문 + 특수문자 + 숫자 포함 8글자 이상의 비밀번호를 설정해주세요."
                maxLength="16"
              ></TextField>

              <IoEyeSharp
                size="24"
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "42px",
                }}
                onClick={() => {
                  setShowPwd(!showPwd);
                }}
              ></IoEyeSharp>
            </InputPosition>

            <InputPosition>
              <TextField
                label="비밀번호 확인"
                name="confirmPassword"
                type={showPwd2 ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요"
                maxLength="16"
              ></TextField>
              <IoEyeSharp
                size="24"
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "42px",
                }}
                onClick={() => {
                  setShowPwd2(!showPwd2);
                }}
              ></IoEyeSharp>
            </InputPosition>

            <Buttons
              margin="62px 0 0 0"
              _onClick={() => {
                dispatch(
                  userActions.signUpMD({
                    userid: formik.values.email,
                    username: formik.values.userName,
                    password: formik.values.password,
                    phonenumber: user_info.phoneNumber,
                    ranNum: user_info.ranNum,
                  })
                );
              }}
            >
              회원가입
            </Buttons>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

const InputPosition = styled.div`
  position: relative;
  margin: 20px 0;
`;