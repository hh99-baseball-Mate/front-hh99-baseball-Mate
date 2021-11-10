import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { ArrowBack, Inputs, NaviBar, Text } from "../components"
import { history } from "../redux/configStore"
import { useDispatch, useSelector } from "react-redux"
import { TextLine } from "../components/TextLine"
import { Modal } from "../components/Modal"
import { Region } from "../componentsScreen/Region"
import { actionCreators as userActions } from "../redux/modules/user"

export const MyInfo = (props) => {
  const dispatch = useDispatch()

  const is_login = useSelector((state) => state.user.is_login)
  const user_info = useSelector((state) => state.user.user_info)
  const { picture, userid, username, usertype, useridx, address } = user_info

  const IMAGES_BASE_URL = process.env.REACT_APP_IMAGES_BASE_URL

  const [showModal, setShowModal] = useState(false)
  const [region, setRegion] = useState(address)
  const [introduce, setIntroduce] = useState("")
  const [preview, setPreview] = useState("")

  const onClicks = () => {
    const formdata = new FormData()

    formdata.append("selfIntroduction", introduce)
    formdata.append("address", region)
    formdata.append("file", preview)

    for (const keyValue of formdata) console.log(keyValue)
    dispatch(userActions.userUpdateMD(formdata, useridx))
  }

  const srcChange = () => {
    if (preview) {
      return URL.createObjectURL(preview)
    } else if (usertype === "normal") {
      return IMAGES_BASE_URL + "/" + picture
    } else if (usertype === "kakao") {
      return picture
    } else {
      return picture
    }
  }

  return (
    <>
      <Container>
        <ArrowBack bg="true"> 내 정보 수정 </ArrowBack>
        {is_login ? (
          <>
            <UserInfo>
              <ProfileImg htmlFor="profile"></ProfileImg>
              <input
                id="profile"
                type="file"
                onChange={(e) => setPreview(e.target.files[0])}
                style={{ display: "none" }}
                accept="image/png, image/jpeg"
              />
              <ProfileSrc src={srcChange()} alt="dd" />
              <Text margin="10px 0 0">{username}</Text>
              <Text color="#777777" size="10px" margin="10px 0">
                {userid ? userid : "나는유저아이디?"}
              </Text>
              <Text>{region}</Text>
            </UserInfo>

            <div style={{ margin: "0 20px 20px" }}>
              <Inputs
                maxLength="100"
                textarea
                margin="20px"
                height="100px"
                onChange={(e) => setIntroduce(e.target.value)}
              >
                자기소개
              </Inputs>
            </div>

            <TextLine onClick={() => history.push("/login/clubchoice")}>
              구단변경
            </TextLine>

            <TextLine onClick={() => setShowModal(true)}>주소변경</TextLine>

            {/* 주소변경 모달 */}
            {showModal && (
              <ModalGrid>
                <Modal bottom height="250px">
                  <Region setShowModal={setShowModal} setRegoin={setRegion} />
                </Modal>
              </ModalGrid>
            )}
          </>
        ) : (
          <Text>로그인 후 이용해주세요</Text>
        )}
        <button onClick={onClicks}>제출</button>
      </Container>
      <NaviBar my />
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
const ProfileImg = styled.label`
  width: 48px;
  height: 48px;
  margin: 0 -20px;
  border-radius: 50%;
  position: relative;
  z-index: 2;
  :hover {
    cursor: pointer;
  }
`
const ProfileSrc = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  position: absolute;
  :hover {
    cursor: pointer;
  }
`

const ModalGrid = styled.div`
  margin: 0 20px;
`
