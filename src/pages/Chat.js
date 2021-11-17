import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import { ArrowBack, MarginBottom, NaviBar } from "../components";
import ChatCard from "../componentsChat/ChatCard";


const Chat = (props) => {

	const history = useHistory();

	return (
		<React.Fragment>
			<ArrowBack>채팅</ArrowBack>

			<ChatCard/>

			<Warp direction="column">
				<Text margin="auto">
					채팅 내역이 없습니다.
				</Text>	
				<Button margin="auto" onClick={()=>{history.push("/mygroup")}}>
					나의 모임으로 이동하기
				</Button>
			</Warp>

			

			<MarginBottom/>
			<NaviBar/>
		</React.Fragment>
	)
}

export default Chat;

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
	position: ${(props) => props.position};
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