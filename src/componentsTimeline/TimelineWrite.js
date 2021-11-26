import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { timelineCreators } from "../redux/modules/timeline";
import { useHistory } from "react-router";
import { getCookie } from '../shared/Cookie';

import user from "../shared/icon/user.svg"
import send from "../shared/icon/send.svg"
import reload from "../shared/icon/reload.svg"

const TimelimeWrite = (props) => {

  const history = useHistory();
  const dispatch = useDispatch();

	const timeline = useSelector((state) => state.timeline.timeline);
  const [message, setMessage] = useState("");
  const cookie = getCookie("is_login");

  const reloadBtn = () => {
		dispatch(timelineCreators.loadTimelineMW())
	}

  const addTimeline = () => {
    if (!cookie) {
      window.alert("로그인 후 이용해주세요");
      history.push("/login")
      return;
    }
    else if (message !== "") {
      dispatch(timelineCreators.addTimelineMW(message));
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

      <Warp flex="flex" bottom="9px" >
        <Text size="15px">
          {timeline.length}개의 소식
        </Text>
        <Circle
          onClick={()=>{reloadBtn()}}
        >
          <img src={reload} alt="reload"/>
        </Circle>
      </Warp>

      <Warp position="relative">
        <Input type="text" maxLength="100"
          placeholder="내용을 입력하세요(최대 100자)" 
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

    </Container>

  );
};

export default TimelimeWrite;

const Container = styled.div`
  margin-bottom: 10px;
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
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background: #FFFFFF;
	border: 1px solid #E7E7E7;
  display: flex;
  justify-content: center;
  align-items: center;
	margin-left: 8px;
`;

const Input = styled.input`
  width: 340px;
  height: 44px;
  border: 1px solid #E7E7E7;
  border-radius: 5px;
  padding: 14px 14px 14px 14px;
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