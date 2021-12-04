import React from "react"
import styled from "styled-components"

import { Inputs, Text } from "../../components/element"
import {
  ArrowBack,
  MarginBottom,
  NaviBar,
  TextLine,
  UserProfile,
} from "../../components/common"
import { BsGear } from "react-icons/bs"
import { history } from "../../redux/configStore"
import { useDispatch, useSelector } from "react-redux"
import { actionCreators as userActions } from "../../redux/modules/user"
import { useProfile } from "../../components/customHook/"

export const MyPage = ({ is_login }) => {
  const dispatch = useDispatch()

  const user_info = useSelector((state) => state.user.user_info)
  const {
    picture,
    userid,
    username,
    usertype,
    useridx,
    address,
    selfIntroduce,
    myteam,
  } = user_info

  // 유저 프로필 사진 가져오기 커스텀훅
  const [userImg] = useProfile(usertype, picture)

  const logOutBtn = () => {
    // 미들웨어를 안썼기 때문에 혹시 모를 err에 대비해서 try catch를 써봄
    try {
      dispatch(userActions.logOut())
      window.alert("로그아웃 하셨습니다.")
      history.replace("/")
    } catch (error) {
      console.log(error)
      window.alert("로그아웃을 실패했습니다.")
    }
  }

  return (
    <>
      <Container>
        <ArrowBack bg="true"> 마이페이지 </ArrowBack>
        {is_login ? (
          <>
            <UserInfo>
              {/* 유저사진 */}
              <ProfileImg>
                <UserProfile size="48" url={userImg} />
              </ProfileImg>

              {/* 아이디 이메일 팀, 주소 유저정보 모음 */}
              <UserId>
                <Text size="14px">{username}</Text>
                <Text color="#777777" size="12px" margin="5px 0 10px">
                  {userid}
                </Text>
                <Text color="#000" size="12px">
                  {myteam} {address}
                </Text>
              </UserId>

              {/* 수정하기 버튼 */}
              <GearIcons
                size="20px"
                onClick={() => history.push(`/mypage/${useridx}/update`)}
              />
            </UserInfo>

            {/* 자기소개글 */}
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

        {/* 로그인 / 로그아웃 */}
        {!is_login ? (
          <TextLine
            onClick={() =>
              is_login
                ? window.alert("이미 로그인 하셨습니다.")
                : history.push("/login")
            }
          >
            로그인 및 회원가입
          </TextLine>
        ) : (
          <TextLine onClick={logOutBtn}>로그아웃</TextLine>
        )}

        <TextLine onClick={() => history.push("/event")}>이벤트</TextLine>

        <TextLine onClick={() => history.push("/notice")}>공지사항</TextLine>
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
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 90px;
  position: relative;
`
const ProfileImg = styled.div`
  margin: 20px;
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

const GearIcons = styled(BsGear)`
  position: absolute;
  right: 20px;
  cursor: pointer;
`
