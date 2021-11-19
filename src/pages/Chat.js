import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import SockJS from "sockjs-client";
import Stomp from "stompjs"

import { ArrowBack, MarginBottom, NaviBar } from "../components";
import ChatCard from "../componentsChat/ChatCard";


const Chat = (props) => {

	const history = useHistory();

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
		<React.Fragment>
			<ArrowBack>채팅</ArrowBack>
			<Rectangle/>

			<ChatCard/>
			<ChatCard/>
			<ChatCard/>
			
			<Container  position="absolute" top="50%" trans="translateY(-50%)">
				<Warp direction="column">
					<Text margin="auto">
						채팅 내역이 없습니다.
					</Text>	
					<Button margin="auto" onClick={()=>{history.push("/mygroup")}}>
						나의 모임으로 이동하기
					</Button>
				</Warp>
			</Container>
			

			<MarginBottom/>
			<NaviBar/>
		</React.Fragment>
	)
}

export default Chat;

const Container = styled.div`
  width: 425px;
  /* background-size: cover; */
  /* height: auto; */
  /* margin: auto; */
	position: ${(props) => props.position};
	top: ${(props) => props.top};
	transform: ${(props) => props.trans};
`;

const Rectangle = styled.div`
	background: #E7E7E7;
	width: 100%;
	height: 1px;
`;

const Warp = styled.div`
	display: flex;
	width: ${(props) => props.width};
	flex-direction: ${(props) => props.direction};
	flex-wrap: ${(props) => props.wrap};
	justify-content: ${(props) => props.justify};
	align-items: ${(props) => props.align};
	align-content: ${(props) => props.start};
	margin-left: ${(props) => props.marginLeft};
	margin: ${(props) => props.margin};
	padding: ${(props) => props.padding};
`;

const Text = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
  letter-spacing: ${(props) => props.spacing};
  margin: ${(props) => props.margin};
  line-height: ${(props) => props.lineHeight};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  /* white-space: nowrap; */
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Button = styled.button`
	width: 184px;
	height: 42px;
	margin: 15px auto;
	/* margin-top: 10px; */
	background: #FFF;
	border-radius: 4px;
	border: 1px solid #F25343;
	color: #F25343;
	font-size: 14px;
`;