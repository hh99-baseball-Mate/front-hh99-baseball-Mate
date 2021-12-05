import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Inputs, Text } from "../../components/element"
import { TextLine, Modal, ArrowBack, NaviBar } from "../../components/common/"
import { history } from "../../redux/configStore"
import { useDispatch, useSelector } from "react-redux"
import { Region } from "../../components/screen/"
import { actionCreators as userActions } from "../../redux/modules/user"
import { useProfile, useS3Upload } from "../../components/customHook/"

const MyInfo = (props) => {
  const dispatch = useDispatch()

  const is_login = useSelector((state) => state.user.is_login)
  const user_info = useSelector((state) => state.user.user_info)

  const { picture, userid, username, usertype, useridx, address, myteam } =
    user_info

  const [showModal, setShowModal] = useState(false)

  // 자기 지역 담을 state
  const [region, setRegion] = useState(address)

  // 자기소개 담을 state
  const [introduce, setIntroduce] = useState("")

  // 미리보기(파일) 담을 state
  const [preview, setPreview] = useState("")

  // S3업로드 커스텀훅
  const [uploadFile, fileName] = useS3Upload(preview, "userProfile")

  const updateProfile = () => {
    uploadFile(preview)

    const updateProfileDate = {
      selfIntroduction: introduce,
      address: region,
      filePath: preview ? fileName : "",
    }

    dispatch(userActions.userUpdateMD(updateProfileDate, useridx))
  }

  const goBack = () => {
    if (!sessionStorage.getItem("introduce")) {
      sessionStorage.setItem("introduce", introduce)
    }

    if (!sessionStorage.getItem("region")) {
      sessionStorage.setItem("region", region)
    }
    history.push("/login/clubchoice")
  }

  const [userImg] = useProfile(usertype, picture)

  const srcChange = () => {
    if (preview) {
      return URL.createObjectURL(preview)
    }
    return userImg
  }

  // 자기소개글, 지역변경 하다가 페이지 이동시 작성하던 글 임시저장 (세션스토리지)

  useEffect(() => {
    if (sessionStorage.getItem("introduce")) {
      setIntroduce(sessionStorage.getItem("introduce"))
      sessionStorage.removeItem("introduce")
    }
    if (sessionStorage.getItem("region")) {
      setRegion(sessionStorage.getItem("region"))
      sessionStorage.removeItem("region")
    }
  }, [])

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
                accept="image/png, image/jpeg image/jpg"
              />
              {/* 유저 사진 */}
              <ProfileSrc url={srcChange} alt="dd" />

              {/* 유저 이름 */}
              <Text margin="10px 0 0">{username}</Text>

              {/* 유저 이메일 */}
              <Text color="#777777" size="10px" margin="10px 0 0">
                {userid ? userid : "나는유저아이디?"}
              </Text>

              {/* 유저 선호 팀 */}
              <Text margin="10px 0">{myteam}</Text>

              {/* 유저 지역 */}
              <Text>{region}</Text>
            </UserInfo>

            {/* 자기소개 */}
            <div style={{ margin: "0 20px 20px" }}>
              <Inputs
                maxLength="100"
                textarea
                margin="20px"
                height="100px"
                placeholder={
                  introduce ? introduce : "자기소개를 입력해주세요(100자 제한)"
                }
                onChange={(e) => setIntroduce(e.target.value)}
              >
                자기소개
              </Inputs>
            </div>

            {/* 탭 */}
            <TextLine onClick={goBack}>구단변경</TextLine>

            <TextLine onClick={() => setShowModal(true)}>주소변경</TextLine>

            {/* 주소변경 선택 모달창 */}
            {showModal && (
              <Modal bottom>
                <Region setShowModal={setShowModal} setRegoin={setRegion} />
              </Modal>
            )}
          </>
        ) : (
          <Text>로그인 후 이용해주세요</Text>
        )}
        <UpdateBtn onClick={updateProfile}>수정하기</UpdateBtn>
      </Container>
      <NaviBar my />
    </>
  )
}

export default MyInfo

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
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
const ProfileSrc = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  position: absolute;
  background-image: url(${(props) => props.url});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  :hover {
    cursor: pointer;
  }
`
const UpdateBtn = styled.button`
  width: 50%;
  border-radius: 30px;
  border: none;
  height: 30px;
  margin: 30px auto;
  background-color: #fff;
  color: #000;
  border: 1px solid #3b5bdb;
  font-size: 14px;
  cursor: pointer;
  :hover {
    background-color: #3b5bdb;
    color: #fff;
  }
`
