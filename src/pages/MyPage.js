import React from "react"
import styled from "styled-components"
import { ArrowBack, Container, Text } from "../components"
import { IoIosArrowForward } from "react-icons/io"
import { history } from "../redux/configStore"
import { useSelector } from "react-redux"

export const MyPage = ({ is_login }) => {
  const user_info = useSelector((state) => state.user.user_info)

  console.log(user_info)

  return (
    <Container>
      <ArrowBack bg="true"> 마이페이지 </ArrowBack>

      {is_login ? (
        <>
          <UserInfo>
            <ProfileImg />
            <Text margin="10px 0 0">{user_info.username}</Text>
            <Text color="#777777" margin="5px 0 25px 0" size="10px">
              {user_info.userid}
            </Text>
          </UserInfo>

          <TextBox onClick={() => history.push("/clubchoice")}>
            <Text margin="0px 20px 0">구단변경</Text>
            <IoIosArrowForward
              color="777777"
              style={{ position: "absolute", right: "20px" }}
            />
          </TextBox>
        </>
      ) : (
        <NotLogin>로그인 후 이용해주세요</NotLogin>
      )}

      <Line />

      <TextBox
        onClick={() =>
          is_login
            ? window.alert("이미 로그인 하셨습니다.")
            : history.push("/login")
        }
      >
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
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  box-sizing: border-box;
  height: 130px;
`
const ProfileImg = styled.div`
  width: 68px;
  height: 68px;
  background-color: #e7e7e7;
  margin: 0 -20px;
  border-radius: 50%;
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

const NotLogin = styled.div`
  height: 187px;
  display: flex;
  align-items: center;
  justify-content: center;
`