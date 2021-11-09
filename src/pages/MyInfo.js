import React, { useState } from "react"
import styled from "styled-components"
import { ArrowBack, Inputs, Text } from "../components"
import { IoIosArrowForward } from "react-icons/io"
import { history } from "../redux/configStore"
import { useSelector } from "react-redux"
import { Modal } from "../components/Modal"

export const MyInfo = (props) => {
  const user_info = useSelector((state) => state.user.user_info)
  const is_login = useSelector((state) => state.user.is_login)
  const IMAGES_BASE_URL = process.env.REACT_APP_IMAGES_BASE_URL

  // 모달 뜨기/ 숨기기
  const [showModal, setShowModal] = useState(false)

  // 모달 값 변경
  const [ModalContent, setModalContent] = useState({
    title: "나가지마이자식아",
    descriptionOne: "ㅇㅇ",
    descriptionTwo: "ㄹㄹ",
    btnClose: "ㄹㄹ",
    btnConfirm: "ㅁㅁ",
  })

  return (
    <>
      <Container>
        <ArrowBack bg="true"> 내 정보 수정 </ArrowBack>
        {is_login ? (
          <>
            <UserInfo>
              <ProfileImg src={`${IMAGES_BASE_URL}/${user_info.picture}`} />
              <Text margin="10px 0 5px">{user_info.username}</Text>
              <Text color="#777777" size="10px">
                {user_info.userid ? user_info.userid : "뭐라도적히냐?"}
              </Text>
            </UserInfo>

            <div style={{ margin: "0 20px 20px" }}>
              <Inputs textarea margin="20px" height="100px">
                자기소개
              </Inputs>
            </div>

            <TextBox onClick={() => history.push("/clubchoice")}>
              <Text margin="0px 20px 0">구단변경</Text>
              <IoIosArrowForward
                color="777777"
                style={{ position: "absolute", right: "20px" }}
              />
            </TextBox>

            <div style={{ position: "relative" }}>
              <Text margin="20px 20px -20px">주소입력</Text>
              <Inputs padding="20px"></Inputs>
              <IoIosArrowForward
                color="777777"
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "20px",
                  cursor: "pointer",
                }}
              />
            </div>
          </>
        ) : (
          <Text>로그인 후 이용해주세요</Text>
        )}
      </Container>
    </>
  )
}

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  max-width: 375px;
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  box-sizing: border-box;
`
const ProfileImg = styled.img`
  width: 48px;
  height: 48px;
  background-color: #e7e7e7;
  margin: 0 -20px;
  border-radius: 50%;
  :hover {
    cursor: pointer;
  }
`
const TextBox = styled.div`
  position: relative;
  padding: 20px 0;
  display: flex;
  border-bottom: 1px solid #e7e7e7;
  cursor: pointer;
`
