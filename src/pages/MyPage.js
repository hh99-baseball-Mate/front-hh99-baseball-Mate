import React from "react"
import styled from "styled-components"
import { ArrowBack, Container, Text } from "../components"
import { IoIosArrowForward } from "react-icons/io"
import { history } from "../redux/configStore"

export const MyPage = (props) => {
  return (
    <Container>
      <ArrowBack bg="true"> 마이페이지 </ArrowBack>

      <UserInfo>
        <ProfileImg />
        <Text margin="10px 0 0">김진희</Text>
        <Text color="#777777" margin="5px 0 25px 0" size="10px">
          gywls2159@naver.com
        </Text>
      </UserInfo>

      <TextBox onClick={() => history.push("/clubchoice")}>
        <Text margin="0px 20px 0">구단변경</Text>
        <IoIosArrowForward
          color="777777"
          style={{ position: "absolute", right: "20px" }}
        />
      </TextBox>

      <Line />

      <TextBox onClick={() => history.push("/login")}>
        <Text margin="0px 20px 0">로그인 및 회원가입</Text>
        <IoIosArrowForward
          color="777777"
          style={{ position: "absolute", right: "20px" }}
        />
      </TextBox>

      <TextBox onClick={() => history.push("/")}>
        <Text margin="0px 20px 0"> 내 모임 </Text>
        <IoIosArrowForward
          color="777777"
          style={{ position: "absolute", right: "20px" }}
        />
      </TextBox>

      <TextBox onClick={() => history.push("/")}>
        <Text margin="0px 20px 0">공지사항</Text>
        <IoIosArrowForward
          color="777777"
          style={{ position: "absolute", right: "20px" }}
        />
      </TextBox>
    </Container>
  )
}

const ProfileImg = styled.div`
  width: 68px;
  height: 68px;
  background-color: #e7e7e7;
  margin: 0 -20px;
  border-radius: 50%;
`
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  box-sizing: border-box;
`
const TextBox = styled.div`
  position: relative;
  padding: 20px 0;
  display: flex;
  border-bottom: 1px solid #e7e7e7;
  margin: 0px -20px;
  cursor: pointer;
`

const Line = styled.div`
  background-color: #e7e7e7;
  height: 6px;
  margin: 0px -20px;
`
