import React, { memo, useCallback, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router"

import { getCookie } from "../../shared/common/Cookie"
import logger from "../../shared/common/Console"

// 소켓통신
import Stomp from "stompjs"
import SockJS from "sockjs-client"
import moment from "moment"

import { ArrowBack, MarginBottom } from "../../components/common"
import { chatCreators } from "../../redux/modules/chat"
import ChatWrite from "./ChatWrite"
import MessageBox from "./MessageBox"
import ChatRoomModal from "./ChatRoomModal"

import more2 from "../../shared/icon/more2.svg"

const ChatRoom = memo((props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()
  const roomId = params.id
  const [modal, setModal] = useState(false)

  const token = getCookie("is_login")

  const sender_nick = useSelector((state) => state.user.user_info?.username)
  const sender_id = useSelector((state) => state.user.user_info?.useridx)
  const sender_profile = useSelector((state) => state.user.user_info?.picture)
  const messages = useSelector((state) => state.chat.messages)
  const chatList = useSelector((state) => state.chat?.chatList)
  const room_id = roomId

  const roomInfo = chatList.find((list) => list.roomId == roomId)

  // 모달창 정보
  const chatUser = useSelector((state) => state.chat?.chatUser)

  const modalInfo = () => {
    setModal(true)
  }

  // 배포, 개발 환경 채팅 주소 관리
  const BASE_URL = process.env.REACT_APP_BASE_URL + "/chatting"

  // 소켓
  const sock = new SockJS(BASE_URL)
  const ws = Stomp.over(sock)

  // 새로고침될때 방 정보 날아가지 않도록 함
  useEffect(() => {
    // 이전 대화 기록 불러오기
    dispatch(chatCreators.getChatMessagesAX(room_id))
    // 챗 리스트 정보 불러오기
    dispatch(chatCreators.loadChatListMW())
    // 현재 채팅방 참여 사용자 정보 불러오기
    dispatch(chatCreators.getChatUserAX(room_id))
  }, [])

  // 방 정보가 바뀌면 소켓 연결 구독, 구독해제
  useEffect(() => {
    // 방 정보가 없는 경우 홈으로 돌려보내기
    if (!room_id) {
      window.alert("잘못된 접근입니다.").then((res) => {
        return history.replace("/")
      })
    }
    wsConnectSubscribe()
    return () => {
      wsDisConnectUnsubscribe()
    }
  }, [room_id ? room_id : null])

  // 채팅방시작하기, 채팅방 클릭 시 room_id에 해당하는 방을 구독
  const wsConnectSubscribe = () => {
    try {
      ws.debug = null
      ws.connect(
        {
          token: token,
        },
        () => {
          ws.subscribe(
            `/sub/api/chat/rooms/${room_id}`,
            (data) => {
              const newMessage = JSON.parse(data.body)
              console.log("구독후 새로운 메세지 data", newMessage)

              // 실시간 채팅 시간 넣어주는 부분
              const now_time = moment().format("YYYY-MM-DD h:mm A")
              // console.log("now_time", now_time)

              dispatch(
                chatCreators.getMessages({
                  ...newMessage,
                  modifiedAt: now_time,
                })
              )
            },
            {
              token: token,
            }
          )
        }
      )
    } catch (err) {
      // console.log(err)
    }
  }

  // 다른 방을 클릭하거나 뒤로가기 버튼 클릭시 연결해제 및 구독해제
  const wsDisConnectUnsubscribe = () => {
    try {
      ws.debug = null
      ws.disconnect(
        () => {
          ws.unsubscribe("sub-0")
          clearTimeout(waitForConnection)
        },
        { token: token }
      )
    } catch (err) {
      // console.log(err)
    }
  }

  // 웹소켓이 연결될 때 까지 실행하는 함수
  const waitForConnection = (ws, callback) => {
    setTimeout(() => {
      if (ws.ws.readyState === 1) {
        callback()
      } else {
        waitForConnection(ws, callback)
      }
    }, 0.1)
  }

  const sendMessage = (new_message) => {
    try {
      // 토큰없으면 다시 로그인 시키기
      if (!token) {
        history.replace("/login")
        return
      }

      //   빈문자열이면 리턴
      if (new_message === "") {
        return
      }

      // send할 데이터
      const data = {
        type: "TALK",
        roomId: room_id,
        sender: sender_nick,
        senderImg: sender_profile,
        senderId: sender_id,
        message: new_message,
      }
      waitForConnection(ws, () => {
        ws.debug = null

        ws.send("/pub/message", { token: token }, JSON.stringify(data))
        // console.log(JSON.stringify(data))
        // console.log("ws", ws)
      })
    } catch (err) {
      // console.log(err)
    }
  }

  // 스크롤 대상
  const messageEndRef = useRef()

  const scrollTomBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollTop = messageEndRef.current.scrollHeight
    }
  }
  // 렌더링시 이동
  useEffect(() => {
    scrollTomBottom()
    // console.log("tell me you are moving now", messageEndRef)
  }, [messages.length])

  return (
    // <React.Fragment>
    <Container ref={messageEndRef}>
      {/* <Container > */}
      <ArrowBack background="background" fixed="fixed" margin="margin">
        <Warp flex="flex" align="center">
          <Text>{roomInfo?.title}</Text>
          <ModalBtn
            src={more2}
            alt=""
            onClick={() => {
              modalInfo()
            }}
          />
        </Warp>
      </ArrowBack>
      <Rectangle />

      {/* 모달 */}
      {modal ? (
        <ChatRoomModal
          modal={modal}
          setModal={setModal}
          room_id={room_id}
          chatUser={chatUser}
          id={sender_id}
          roomInfo={roomInfo}
        />
      ) : null}

      <Box padding="62px 8px 3px 8px">
        {messages.map((messages) => {
          return <MessageBox key={messages.id} {...messages} />
        })}
      </Box>
      <MarginBottom chat />
      <ChatWrite sendMessage={sendMessage} />
    </Container>
    // </React.Fragment>
  )
})

export default ChatRoom

const Container = styled.div`
  /* margin-bottom: 10px; */
  max-width: 425px;
  width: 100%;
  position: relative;
  background: #fff0ee;
  height: 100vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

const ModalBtn = styled.img`
  padding: 10px;
  position: absolute;
  /* left: 41.67%; */
  right: 10px;
  /* top: 12.5%;
	bottom: 12.5%; */
`

const Rectangle = styled.div`
  background: #e7e7e7;
  width: 100%;
  height: 1px;
`

const Box = styled.div`
  height: ${(props) => props.height};
  background: ${(props) => props.background};
  padding: ${(props) => props.padding};
  display: ${(props) => props.flex};
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  position: ${(props) => props.position};
`

const Warp = styled.div`
  /* max-width: 425px; */
  width: 90%;
  display: ${(props) => props.flex};
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  margin-left: ${(props) => props.marginLeft};
  margin-bottom: ${(props) => props.bottom};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  position: ${(props) => props.position};
`

const Text = styled.div`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
  letter-spacing: ${(props) => props.spacing};
  margin: ${(props) => props.margin};
  margin-bottom: ${(props) => props.bottom};
  width: 90%;
  margin: 0 auto;
  padding-left: 10px;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  /* white-space: nowrap; */
  text-overflow: ellipsis;
  overflow: hidden;

  text-align: center
`

const Circle = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid #e7e7e7;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
`

const Talk = styled.div`
  max-width: 222px;
  background: #ffffff;
  border-radius: 0px 10px 10px 10px;
`

const Input = styled.input`
  width: 335px;
  height: 44px;
  border: 1px solid #e7e7e7;
  border-radius: 5px;
  padding: 14px 40px 14px 14px;
  ::placeholder {
    font-size: 14px;
    color: #c4c4c4;
  }
`

const SendImg = styled.img`
  position: absolute;
  /* left: 8.34%; */
  right: 8px;
  bottom: 50%;
  transform: translateY(50%);
  cursor: pointer;
`
