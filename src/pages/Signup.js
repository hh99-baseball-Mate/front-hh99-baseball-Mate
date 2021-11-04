import React, { useState } from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { passwordCheck, emailCheck } from "../shared/LoginCheck";

import {
  Buttons,
  Inputs,
  Text,
  Container,
  ArrowBack,
  InputCheck,
} from "../components";

import { IoEyeSharp } from "react-icons/io5";
import { AiOutlineCheck } from "react-icons/ai";
import { Form, Formik } from "formik"
import { TextField } from "../componentsLogin/TextField"

export const Signup = (props) => {
  const { history } = props

  const dispatch = useDispatch()

  // 비밀번호 숨기기/보이기
  const [showPwd, setShowPwd] = useState(false)
  const [showPwd2, setShowPwd2] = useState(false)

  // 인풋 여러개쓰기
  // const [inputsValue, setInputValue] = useState({
  //   userid: "",
  //   username: "",
  //   password: "",
  //   password2: "",
  // });

  // 비구조화 할당
  // const { userid, username, password, password2 } = inputsValue;

  // // name 에는 input 네임이 value 에는 그 값들이 들어감
  // const onChangeValue = (e) => {
  //   const { name, value } = e.target;
  //   setInputValue({
  //     ...inputsValue,
  //     [name]: value,
  //   });
  // };

  // const idCehcking = userid !== "" && emailCheck.test(userid);
  // const userNameChecking = username !== "";
  // const passwordChecking = password !== "" && passwordCheck.test(password);
  // const password2Checking = password2 !== "" && password === password2;

  // const signUpChecking = (e) => {
  //   if (
  //     idCehcking &&
  //     userNameChecking &&
  //     passwordChecking &&
  //     password2Checking
  //   ) {
  //     dispatch(userActions.signUpMD({ userid, username, password }));
  //     e.currentTarget.disabled = true;
  //     console.log("가입완료");
  //   } else {
  //     window.alert("입력한 내용을 다시 확인하시기 바랍니다.");
  //     console.log("가입실패");
  //   }
  // };

  return (
    <Container>
      {/* 헤더 */}
      <ArrowBack>
        이메일로 가입
      </ArrowBack>

      {/* 게정생성 */}
      <div style={{ margin: "50px 0 0 0" }}>
        <Text size="20px" bold>
          계정생성
        </Text>
      </div>

      <Formik
        initialValues={{
          email: "",
          userNmae: "",
          password: "",
          confirmPassword: "",
        }}
      >
        <Form>
          <div style={{ position: "relative", marginTop: "25px" }}>
            <TextField
              label="이메일"
              name="이메일"
              type="email"
              placeholder="이메일을 입력해주세요"
            ></TextField>
            {/* <button
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
          </button> */}
          </div>

          {/* 입력오류 문구 */}
          {/* {!idCehcking && (
          <Text color="#FB1F07" size="9px">
            이메일 양식을 확인해주세요
          </Text>
        )} */}

          <TextField
            label="닉네임"
            name="닉네임"
            type="text"
            placeholder="닉네임을 입력해주세요"
          ></TextField>

          {/* 입력오류 문구 */}
          {/* {!userNameChecking && (
          <Text color="#FB1F07" size="9px">
            아이디를 확인해주세요
          </Text>
        )} */}

          <InputPosition>
            <TextField
              label="비밀번호"
              name="비밀번호"
              check
              type={showPwd ? "text" : "password"}
              placeholder="영문 + 특수문자 + 숫자 포함 8글자 이상의 비밀번호를 설정해주세요."
            ></TextField>

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
          </InputPosition>

          {/* 입력오류 문구
        {!passwordChecking && (
          <Text color="#FB1F07" size="9px">
            영문 + 특수문자 + 숫자 포함 8글자 이상의 비밀번호를 설정해주세요.
          </Text>
        )} */}

          <InputPosition>
            <TextField
              label="비밀번호 확인"
              name="비밀번호 확인"
              type={showPwd2 ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요"
            ></TextField>
            <IoEyeSharp
              size="24"
              style={{
                position: "absolute",
                right: "10px",
                top: "42px",
              }}
              onClick={() => {
                setShowPwd2(!showPwd2)
              }}
            ></IoEyeSharp>
          </InputPosition>

          {/* 입력오류 문구 */}
          {/* {!password2Checking && (
          <Text color="#FB1F07" size="9px">
            비밀번호가 일치하지 않습니다.
          </Text>
        )} */}
          <Buttons margin="62px 0 0 0" border="1px solid #EC5E4F" bg="#FFFFFF">
              회원가입
          </Buttons>
        </Form>
      </Formik>
    </Container>
  )
}

const InputPosition = styled.div`
  position: relative;
  margin: 20px 0;
`
