import React, { useState } from "react"
import styled from "styled-components"
import { ArrowBack, Inputs, Text, MarginBottom, NaviBar } from "../components"
import { IoIosArrowForward } from "react-icons/io"
import { BsGear } from "react-icons/bs"
import { history } from "../redux/configStore"
import { useSelector } from "react-redux"
import { Modal } from "../components/Modal"
import { TextLine } from "../components/TextLine"

export const MyPage = ({ is_login }) => {
  const IMAGES_BASE_URL = process.env.REACT_APP_IMAGES_BASE_URL

  // const defaultUserProfile =
  //   "http://kmvkf2hvhfn2vj9tl8e6ps7v-wpengine.netdna-ssl.com/wp-content/uploads/2017/10/default-img.png"

  const user_info = useSelector((state) => state.user.user_info)
  const {
    picture,
    userid,
    username,
    usertype,
    useridx,
    address,
    selfIntroduce,
  } = user_info
  // console.log(user_info)

  // 모달 뜨기/ 숨기기
  const [showModal, setShowModal] = useState(false)

  // 모달 값 변경
  const [ModalContent, setModalContent] = useState({
    title: "나가지마이자식아",
    descriptionOne: "ㅇㅇ",
    descriptionTwo: "ㄹㄹ",
    btnClose: "취소",
    btnConfirm: "나가기",
  })

  const srcChange = () => {
    if (usertype === "normal") {
      return IMAGES_BASE_URL + picture
    } else if (usertype === "kakao") {
      return picture
    } else {
      return picture
    }
  }

  return (
    <>
      <Container>
        <ArrowBack bg="true"> 마이페이지 </ArrowBack>
        {is_login ? (
          <>
            <UserInfo>
              <ProfileImg src={srcChange()} />
              <UserId>
                <Text size="14px">{username}</Text>
                <Text color="#777777" size="12px" margin="5px 0">
                  {userid}
                </Text>
                <Text color="#000" size="12px">
                  {address}
                </Text>
              </UserId>
              <BsGear
                size="20px"
                style={{
                  position: "absolute",
                  right: "20px",
                  cursor: "pointer",
                }}
                onClick={() => history.push(`/mypage/${useridx}/update`)}
              />
            </UserInfo>

            <div style={{ margin: "0 20px 20px" }}>
              <Inputs
                textarea
                margin="20px"
                height="60px"
                disabled
                placeholder={selfIntroduce}
              ></Inputs>
            </div>
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

        <TextLine onClick={() => history.push("/mygroup")}>내모임</TextLine>

        {/* 모달창 */}
        {showModal && (
          <Modal
            center
            title={ModalContent.title}
            descriptionOne={ModalContent.descriptionOne}
            descriptionTwo={ModalContent.descriptionTwo}
            btnClose={ModalContent.btnClose}
            btnConfirm={ModalContent.btnConfirm}
            setShowModal={setShowModal}
          ></Modal>
        )}

        <TextLine onClick={() => window.alert(" 구현 중 입니다.")}>
          공지사항
        </TextLine>
      </Container>

      {/* 하단네비바 */}
      <MarginBottom />
      <NaviBar my />
    </>
  )
}

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`

const UserInfo = styled.div`
  position: relative;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  box-sizing: border-box;
  height: 90px;
`
const ProfileImg = styled.img`
  width: 48px;
  height: 48px;
  /* background-color: #e7e7e7; */
  margin: 20px;
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
const Line = styled.div`
  background-color: #e7e7e7;
  height: 6px;
`

const UserId = styled.div``

const NotLogin = styled.div`
  height: 187px;
  display: flex;
  align-items: center;
  justify-content: center;
`
