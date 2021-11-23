import React, { memo, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { getCookie } from "../shared/Cookie";
import logger from "../shared/Console"

// 소켓통신
import Stomp from "stompjs";
import SockJS from "sockjs-client";

import { ArrowBack, MarginBottom, NaviBar } from "../components";
import { chatCreators } from "../redux/modules/chat";
import ChatWrite from "./ChatWrite";
import MessageBox from "./MessageBox";
import ChatRoomModal from "./ChatRoomModal";

import more from "../shared/icon/more.svg"
import more2 from "../shared/icon/more2.svg"
import { useHistory } from "react-router";


const ChatRoom = (props) => {

	const dispatch =  useDispatch()
	const history = useHistory()
	const [modal, setModal] = useState(false);

	const token = getCookie("is_login");
	// console.log(token)

	const sender_nick = useSelector((state) => state.user.user_info?.username);
	const sender_id = useSelector((state) => state.user.user_info?.useridx);
	const room_id = 912;

	console.log("sender_id",sender_id)
	
	const modalInfo =() => {
		setModal(true);

	}

	// 배포, 개발 환경 채팅 주소 관리
	// const BASE_URL = process.env.REACT_APP_BASE_URL + "/chatting";
	const BASE_URL = process.env.REACT_APP_BASE_URL + "/chatting";

	// const env = process.env.NODE_ENV;
  // const devTarget =
  //   env === "development" ? "http://115.85.182.57/chatting" : "https://gorokke.shop/chatting";
	// 소켓
	const sock = new SockJS(BASE_URL);
	const ws = Stomp.over(sock);

	console.log("sock",sock)


	  // 새로고침될때 방 정보 날아가지 않도록 함
		React.useEffect(() => {
			// logger("chat props", props);
			// logger("chat sender info", sender_profile);
			// logger("chat user_in_chat", user_in_chat);
			// dispatch(userAction.loginCheck());
	
			// 리덕스의 현재방 정보 변경
			// if (token) {
			// 	dispatch(
			// 		chatActions.moveChatRoom(
			// 			room_id,
			// 			roomName,
			// 			post_id,
			// 			own_user_id,
			// 			order_time
			// 		)
			// 	);
				// 이전 대화 기록 불러오기
				dispatch(chatCreators.getChatMessagesAX());
				// 현재 채팅방 참여 사용자 정보 불러오기
				// dispatch(chatActions.getChatUserAX(room_id));
			// }
		}, []);


  // 방 정보가 바뀌면 소켓 연결 구독, 구독해제
  React.useEffect(() => {
    // 방 정보가 없는 경우 홈으로 돌려보내기
    // if (!room_id) {
    //   return window.alert
    //     (
    //       "잘못된 접근입니다.",
    //       "홈으로 돌아갑니다.",
    //       "채팅 신청 후 채팅탭을 이용해주세요.",
    //       "확인"
    //     )
    //     .then((res) => {
    //       return history.replace("/");
    //     });
    // }
    wsConnectSubscribe();
    return () => {
      wsDisConnectUnsubscribe();
    };
  }, [room_id ? room_id : null]);


	// 채팅방시작하기, 채팅방 클릭 시 room_id에 해당하는 방을 구독
	const wsConnectSubscribe = () => {
	  try {
	    ws.debug = null;
	    ws.connect(
	      {
	        token: token,
	      },
	      () => {
	        ws.subscribe(
	          `/sub/api/chat/rooms/${room_id}`,
	          (data) => {
	            const newMessage = JSON.parse(data.body);
	            logger("구독후 새로운 메세지 data", newMessage);
	            console.log("구독후 새로운 메세지 data", newMessage);

	            // 실시간 채팅 시간 넣어주는 부분
	            // const now_time = moment().format("YYYY-MM-DD HH:mm:ss");
	            // dispatch(
	            //   chatActions.getMessages({ ...newMessage, createdAt: now_time })
	            // );
	          },
	          {
	            token: token,
	          }
	        );
	      }
	    );
	  } catch (err) {
			console.log(err);
	    // logger("소켓 커넥트 에러", e);
			console.log(err)
	  }
	};


	  // 다른 방을 클릭하거나 뒤로가기 버튼 클릭시 연결해제 및 구독해제
		const wsDisConnectUnsubscribe = () => {
			try {
				ws.debug = null;
				ws.disconnect(
					() => {
						ws.unsubscribe("sub-0");
						clearTimeout(waitForConnection);
					},
					{ token: token }
				);
			} catch (e) {
				logger("연결 구독 해체 에러", e);
			}
		};


		// 웹소켓이 연결될 때 까지 실행하는 함수
		const waitForConnection = (ws, callback) => {
			setTimeout(() => {
				if (ws.ws.readyState === 1) {
					callback();
				} else {
					waitForConnection(ws, callback);
				}
			}, 0.1);
		};


		const sendMessage = (new_message) => {
			try {
				// 토큰없으면 다시 로그인 시키기
				// if (!token) {
				// 	customAlert.sweetNeedLogin();
				// }

				//   빈문자열이면 리턴
				if (new_message === '') {
					return;
				}

				// send할 데이터
				const data = {
					type: "TALK",
					roomId: room_id,
					sender: sender_nick,
					// senderImg: sender_profile,
					senderId: sender_id,
					message: new_message,
				};
				waitForConnection(ws, () => {
					// ws.debug = null;
	
					ws.send("/pub/message", { token: token }, JSON.stringify(data));
					// logger("메세지보내기 상태", ws.ws.readyState);
					console.log(JSON.stringify(data))
					console.log("ws",ws);
				});
			} catch (e) {
				console.log(e)
				logger("message 소켓 함수 에러", e);
				logger("메세지보내기 상태", ws.ws.readyState);
			}
		};

		// console.log("bb")

	return (
		// <React.Fragment>
		<Container>
			<ArrowBack background="background">
				롯데 응원방
				<Warp flex="flex" align="center">
					<ModalBtn src={more2} alt="" 
						onClick={()=>{modalInfo()}}
					/>
				</Warp>
			</ArrowBack>
			<Rectangle/>




		

				{/* 모달 */}
				{
					modal ? <ChatRoomModal modal={modal} setModal={setModal}/> : null
				}
				

				<Box padding="20px" >

					<MessageBox/>

				</Box>
				<ChatWrite sendMessage={sendMessage}/>
			</Container>
		// </React.Fragment>
	)
}

export default ChatRoom;

const Container = styled.div`
  /* margin-bottom: 10px; */
	width: 425px;
	position: relative;
	background: #FFF0EE;
	height: 100vh;
`;

const ModalBtn = styled.img`
	padding: 10px;
	position: absolute;
	/* left: 41.67%; */
	right: 10px;
	/* top: 12.5%;
	bottom: 12.5%; */
`;

const Rectangle = styled.div`
	background: #E7E7E7;
	width: 100%;
	height: 1px;
`;

const Box = styled.div`
  width: 425px;
  height: ${(props) => props.height};
  background: ${(props) => props.background};
  padding: ${(props) => props.padding};
  display: ${(props) => props.flex};
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  position: ${(props) => props.position};
`;

const Warp = styled.div`
	/* width: 100%; */
	display: ${(props) => props.flex};
	flex-direction: ${(props) => props.direction};
	justify-content: ${(props) => props.justify};
	align-items: ${(props) => props.align};
	margin-left: ${(props) => props.marginLeft};
	margin-bottom: ${(props) => props.bottom};
	margin: ${(props) => props.margin};
	padding: ${(props) => props.padding};
	position: ${(props) => props.position};
`;

const Text = styled.div`
	font-size: ${(props) => props.size};
	font-weight: ${(props) => props.weight};
	color: ${(props) => props.color};
	letter-spacing: ${(props) => props.spacing};
	margin: ${(props) => props.margin};
	margin-bottom: ${(props) => props.bottom};
`;

const Circle = styled.div`
	width: 45px;
	height: 45px;
	border-radius: 50%;
	background: #FFFFFF;
	border: 1px solid #E7E7E7;
  display: flex;
  justify-content: center;
  align-items: center;
	margin-left: 8px;
`;

const Talk = styled.div`
	max-width: 222px;
	background: #FFFFFF;
	border-radius: 0px 10px 10px 10px;
`;




const Input = styled.input`
  width: 335px;
  height: 44px;
  border: 1px solid #E7E7E7;
  border-radius: 5px;
  padding: 14px 40px 14px 14px;
  ::placeholder {
    font-size: 14px;
    color: #C4C4C4;
  }
`;

const SendImg = styled.img`
  position: absolute;
  /* left: 8.34%; */
  right: 8px;
  bottom: 50%;
  transform: translateY(50%);
  cursor: pointer;
`;