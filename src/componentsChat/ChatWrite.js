import React, { memo, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import logger from "../shared/Console";

import upload from "../shared/icon/upload.svg"

const ChatWrite = (props) => {
  const { sendMessage } = props // 메세지 보내기 stomp 함수

  // 보낼 메세지 텍스트
  const now_message = useRef()
  const msg = now_message.current

  // console.log("msg",msg)

  const [new_message, setMessage] = useState("")
  const changeMessage = (e) => {
    setMessage(e.target.value);
  };

  // 메세지 보내기 버튼 클릭 시 실행 될 함수
  const sendMessageBtn = () => {
    // logger("보낼 메세지 내용", typeof msg.defaultValue, msg.defaultValue)
    sendMessage(msg.defaultValue) //메세지 실제로 보내기
    setMessage("") // input 비우기
  }

  const enterBtn = (e) => {
    if (e.key === "Enter") {
      sendMessageBtn(e)
    }
  }

  // console.log("G")

  return (
    <Container>
      <Box>
        <Warp position="relative">
          <Input
            type="text"
            placeholder="메시지를 입력하세요"
            value={new_message}
            ref={now_message}
            onChange={changeMessage}
            onKeyPress={enterBtn}
          />

          {msg && (
            <SendImg
              src={upload}
              alt="send"
              onClick={() => {
                sendMessageBtn()
              }}
            />
          )}
        </Warp>
      </Box>
    </Container>
  )
}

export default ChatWrite;

const Container = styled.div`
	max-width: 425px;
  width: 100%;
	/* opacity: 0.5; */
  position: fixed;
	bottom:0;
`;


const Box = styled.div`
  max-width: 425;
  width: 100%;
  height: 74px;
  background: #fff;
  padding: ${(props) => props.padding};
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: center;
  align-items: center;
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
  width: 350px;
  height: 44px;
  border: 1px solid #E7E7E7;
  border-radius: 50px;
  padding: 14px 45px 14px 14px;
  ::placeholder {
    font-size: 14px;
    color: #C4C4C4;
  }
	:focus {outline:none;}
`;

const SendImg = styled.img`
  position: absolute;
  /* left: 8.34%; */
  right: 8px;
  bottom: 50%;
  transform: translateY(50%);
  cursor: pointer;
`;