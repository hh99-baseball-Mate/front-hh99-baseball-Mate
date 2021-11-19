import React, { useState } from "react";
import styled from "styled-components";

import { ArrowBack, MarginBottom, NaviBar } from "../components";
import ChatWrite from "./ChatWrite";
import MessageBox from "./MessageBox";

const ChatRoom = (props) => {


	return (
		<Container>
			<ArrowBack>롯데 응원방</ArrowBack>
			<Rectangle/>
			<Box background="#FFF0EE" height="96vh" padding="20px">

				<MessageBox/>

			</Box>
			<ChatWrite/>
		</Container>
	)
}

export default ChatRoom;

const Container = styled.div`
  margin-bottom: 10px;
	width: 425px;
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