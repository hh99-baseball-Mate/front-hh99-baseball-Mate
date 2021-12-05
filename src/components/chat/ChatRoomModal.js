import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { chatCreators } from "../../redux/modules/chat"

const ChatRoomModal = (props) => {
  // console.log("유저", props)
  const dispatch = useDispatch()

  // 유저 리스트 중에 나만 골라내기
  const me = props.chatUser.find((users) => users.id === props.id)

  // 나를 제외한 다른 유저
  const otherUsers = props.chatUser.filter((users) => users.id !== props.id)
  // console.log("다른사람", otherUsers)

  // 사진 ip주소 + 사진이름 조합
  const IMAGES_BASE_URL = process.env.REACT_APP_S3_USER_PROFILE_URL
  const ip = IMAGES_BASE_URL

  // 기본 로그인일 때 프로필 사진
  const profileImg = ip + me.picture

  // kakaocdn (카카오 프사인지 확인)
  const kakaoCheck = me.picture?.split(".")[1]
  const kakaoImg = me.picture

  const chatList = useSelector((state) => state.chat?.chatList)

  // 모달 오버레이에서 스크롤 방지
  React.useEffect(() => {
    document.body.style.cssText = `
        position: fixed; 
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`
    return () => {
      const scrollY = document.body.style.top
      document.body.style.cssText = ""
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1)
    }
  }, [])

  // 채팅방 나가기
  const leaveChat = () => {
    if (window.confirm("정말 채팅방을 나가겠습니까?")) {
      dispatch(chatCreators.leaveChatAX(props.roomInfo.groupId))
    }
  }

  // 스크린야구 채팅방 나가기
  const leaveScreenChat = () => {
    if (window.confirm("정말 채팅방을 나가겠습니까?")) {
      dispatch(chatCreators.leaveScreenChatAX(props.roomInfo.groupId))
    }
  }

  // console.log("B")

  return (
    <React.Fragment>
      {/* 바깥여백 */}
      <Background
        onClick={() => {
          props.setModal(false)
        }}
      />

      {/* 모달창 */}
      <Container>
        <Text size="16px" weight="bold" marginB="20px">
          대화상대
        </Text>

        <Warp marginB="10px" align="center">
          <ImgCircle url={kakaoCheck === "kakaocdn" ? kakaoImg : profileImg} />
          <Circle>
            <Text color="#fff" size="10px">
              나
            </Text>
          </Circle>
          <Text>{me.username}</Text>
        </Warp>

        {otherUsers.map((list) => {
          return <Profile key={list.id} {...list} />
        })}

        {/* 하단고정 */}
        <Footer
          position="fixed"
          onClick={() => {
            props.roomInfo.chatRoomtype === "screen"
              ? leaveScreenChat()
              : leaveChat()
          }}
        >
          채팅방 나가기🔚
        </Footer>
      </Container>
    </React.Fragment>
  )
}

// 다른사람 프로필 컴포넌트
const Profile = (props) => {
  // 사진 ip주소 + 사진이름 조합
  const IMAGES_BASE_URL = process.env.REACT_APP_S3_USER_PROFILE_URL
  const ip = IMAGES_BASE_URL

  // 기본 로그인일 때 프로필 사진
  const profileImg = ip + props.picture

  // kakaocdn (카카오 프사인지 확인)
  const kakaoCheck = props.picture?.split(".")[1]
  const kakaoImg = props.picture

  return (
    <Warp marginB="10px" align="center">
      <ImgCircle url={kakaoCheck === "kakaocdn" ? kakaoImg : profileImg} />
      <Text>{props.username}</Text>
    </Warp>
  )
}

export default React.memo(ChatRoomModal)

const Background = styled.div`
  /* width: calc(100vw - 200px); */
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.65);
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  justify-content: flex-end;
  /* align-items: center; */
  z-index: 1;
`

const Container = styled.div`
  width: 70%;
  height: 100vh;
  background-color: white;
  padding: 26px 20px;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2;
`

const Warp = styled.div`
  display: flex;
  width: ${(props) => props.width};
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  margin-left: ${(props) => props.marginLeft};
  margin-top: ${(props) => props.marginT};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  position: ${(props) => props.position};
  margin-bottom: ${(props) => props.marginB};
`

const Text = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
  letter-spacing: ${(props) => props.spacing};
  margin: ${(props) => props.margin};
  margin-bottom: ${(props) => props.marginB};
  line-height: ${(props) => props.lineHeight};

  /* display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden; */
`

const ImgCircle = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #c4c4c4;
  border: 1px solid #e7e7e7;
  background-image: url(${(props) => props.url});
  /* background-size: contain; */
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin-right: 13px;
`

const Circle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #777777;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 6px;
`

const Footer = styled.div`
  position: fixed;
  background-color: #fff2f2; /*임의색상*/
  width: inherit;
  padding: 20px;
  right: 0;
  bottom: 0;
  height: 60px;
  cursor: pointer;
`
