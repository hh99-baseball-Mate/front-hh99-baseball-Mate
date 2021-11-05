import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { Inputs, Buttons, Text } from "../components";
import { Container } from "../components/Container";
import { InputCheck } from "../components/InputCheck";

import { kakaoUrl } from "../shared/SocialLogin/Kakao";
import { emailCheck, passwordCheck } from "../shared/LoginCheck";

import { actionCreators as userActions } from "../redux/modules/user";
import { MdKeyboardArrowDown } from "react-icons/md";

export const Login = (props) => {
  const { history } = props;

  const [loginOther, setLoginOther] = useState(false);

  const [inputValue, setInputValue] = useState({
    userid: "",
    password: "",
  });

  const { userid, password } = inputValue;

  const idCehcking = userid !== "" && emailCheck.test(userid);
  const passwordChecking = password !== "" && passwordCheck.test(password);

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const dispatch = useDispatch();

  return (
    <>
      {/* 헤더 */}
      <Container>
        <Logo>야구메이트</Logo>

        {/* 로그인 인풋창 / 버튼 */}

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

        {/* 입력오류 문구 */}
        {!idCehcking && (
          <Text color="#FB1F07" size="9px">
            이메일 양식을 확인해주세요
          </Text>
        )}

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
          {passwordChecking && <InputCheck />}
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
            dispatch(
              userActions.logInMD({
                userid,
                password,
              })
            );
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
            setLoginOther(!loginOther);
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
      </Container>
      {/* 소셜로그인 */}
      {loginOther ? (
        <>
          <Container margin="0px auto">
            <Buttons bg="#4DBF39" _onClick={() => history.push("/signup")}>
              <Text color="#fff" bold>
                네이버로 로그인
              </Text>
            </Buttons>
            <Buttons
              bg="#FAE100"
              _onClick={() => {
                window.location.href = kakaoUrl;
              }}
            >
              <Text color="#3C1D1E" bold>
                카카오톡으로 로그인
              </Text>
            </Buttons>
            <Buttons
              bg="#1877F2"
              border
              _onClick={() => history.push("/signup")}
            >
              <Text color="#fff" bold>
                페이스북으로 로그인
              </Text>
            </Buttons>
          </Container>
        </>
      ) : null}
    </>
  );
};

const Logo = styled.div`
  width: 278px;
  height: 58px;
  margin: 132px auto;
  font-size: 37px;
  font-weight: 700px;
  text-align: center;
`;
