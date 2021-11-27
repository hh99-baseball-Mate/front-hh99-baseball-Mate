import React from "react"
import styled from "styled-components"
import { ArrowBack, Inputs, Text, MarginBottom, NaviBar } from "../components"
import { BsGear } from "react-icons/bs"
import { history } from "../redux/configStore"
import { useDispatch, useSelector } from "react-redux"
import { TextLine } from "../components/TextLine"
import { actionCreators as userActions } from "../redux/modules/user"

export const MyPage = ({ is_login }) => {
  const dispatch = useDispatch()

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
    myteam,
  } = user_info

  const srcChange = () => {
    if (usertype === "normal") {
      return IMAGES_BASE_URL + picture
    } else if (usertype === "kakao") {
      return picture
    } else {
      return picture
    }
  }

  const logOutBtn = () => {
    // 미들웨어를 안썼기 때문에 혹시 모를 err에 대비해서 try catch를 써봄
    try {
      dispatch(userActions.logOut())
      window.alert("로그아웃 하셨습니다.")
      history.replace("/")
    } catch (error) {
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
              <ProfileImg src={srcChange()} />
              <UserId>
                <Text size="14px">{username}</Text>
                <Text color="#777777" size="12px" margin="5px 0 10px">
                  {userid}
                </Text>
                <Text color="#000" size="12px">
                  {myteam} {address}
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

        {/* <TextLine onClick={() => history.push("/mygroup")}>내모임</TextLine> */}
        <TextLine onClick={() => history.push("/event")}>이벤트</TextLine>

        <TextLine onClick={() => window.alert("준비중입니다")}>
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
  align-items: center;
  box-sizing: border-box;
  height: 90px;
`
const ProfileImg = styled.img`
  width: 48px;
  height: 48px;
  margin: 20px;
  border-radius: 50%;

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
