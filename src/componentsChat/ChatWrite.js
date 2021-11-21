import React, { useState } from "react";
import styled from "styled-components";

import { ArrowBack, MarginBottom, NaviBar } from "../components";
import send from "../shared/icon/send.svg"

const ChatWrite = (props) => {

  const [message, setMessage] = useState("");

	const addTimeline = () => {

    if (message !== "") {
      // dispatch(timelineCreators.addTimelineMW(message));
      setMessage("");
      return;
    } 
    else {
      window.alert("내용을 입력하세요")
      return;
    }
  };

	return (
		<Container>
				
			<Box>
				<Warp position="relative">
					<Input type="text"
						placeholder="메시지를 입력하세요" 
						value={message}
						onChange={(e) => {
							setMessage(e.target.value);
						}}
						onKeyPress={(e) => {
							if(e.key === "Enter"){
								addTimeline(e);
							}
						}}
					/>

					<SendImg src={send} alt="send"
						onClick={() => {addTimeline()}}
					/>
				</Warp>
			</Box>

		</Container>
	)
}

export default ChatWrite;

const Container = styled.div`
  margin-bottom: 10px;
	width: 425px;
`;

const Box = styled.div`
  width: 425px;
  height: 74px;
  background: #fff;
  padding: ${(props) => props.padding};
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: center;
  align-items: center;
  position: fixed;
	bottom:0;
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