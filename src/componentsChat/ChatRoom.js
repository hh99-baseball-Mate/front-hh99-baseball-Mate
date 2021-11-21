import React, { useState } from "react";
import styled from "styled-components";

import SockJS from "sockjs-client";
import Stomp from "stompjs"

import { ArrowBack, MarginBottom, NaviBar } from "../components";
import ChatWrite from "./ChatWrite";
import MessageBox from "./MessageBox";
import ChatRoomModal from "./ChatRoomModal";

import more from "../shared/icon/more.svg"
import more2 from "../shared/icon/more2.svg"

const ChatRoom = (props) => {

	const [modal, setModal] = useState(false);
	
	const modalInfo =() => {
		setModal(true);

	}

	// 배포, 개발 환경 채팅 주소 관리
	const BASE_URL = process.env.REACT_APP_BASE_URL;
	// 소켓
	const sock = new SockJS(BASE_URL);
	const ws = Stomp.over(sock);


	// 채팅방시작하기, 채팅방 클릭 시 room_id에 해당하는 방을 구독
	// const wsConnectSubscribe = () => {
	//   try {
	//     ws.debug = null;
	//     ws.connect(
	//       {
	//         // token: token,
	//       },
	//       () => {
	//         ws.subscribe(
	//           `/sub/api/chat/rooms/${room_id}`,
	//           (data) => {
	//             const newMessage = JSON.parse(data.body);
	//             // logger("구독후 새로운 메세지 data", newMessage);
	//             console.log("구독후 새로운 메세지 data", newMessage);

	//             // 실시간 채팅 시간 넣어주는 부분
	//             const now_time = moment().format("YYYY-MM-DD HH:mm:ss");
	//             dispatch(
	//               chatActions.getMessages({ ...newMessage, createdAt: now_time })
	//             );
	//           },
	//           {
	//             token: token,
	//           }
	//         );
	//       }
	//     );
	//   } catch (err) {
	// 		console.log(err);
	//     // logger("소켓 커넥트 에러", e);
	// 		console.log(err)
	//   }
	// };

	return (
		// <React.Fragment>
		<Container>
			<ArrowBack>
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
				<ChatWrite/>
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