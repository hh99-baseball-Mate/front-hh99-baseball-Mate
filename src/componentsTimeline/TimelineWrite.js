import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { timelineCreators } from "../redux/modules/timeline";

import user from "../shared/icon/user.svg"
import send from "../shared/icon/send.svg"

const TimelimeWrite = (props) => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");

  const addTimeline = () => {
    dispatch(timelineCreators.addTimelineMW(message));
    setMessage("");
  };

  return (
    <React.Fragment>
      <Container>

        <Warp flex="flex">
          <div>
            <Circle>
              <UserImg src={user} alt="user"/>
            </Circle>
          </div>

          <Warp position="relative">
            <Input type="text" maxLength="20"
              placeholder="내용을 입력하세요(최대 20자)" 
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

            <Button onClick={() => {addTimeline()}}>
              <SendImg src={send} alt="send"/>
            </Button>
          </Warp>
        </Warp>

      </Container>
    </React.Fragment>
  );
};

export default TimelimeWrite;

const Container = styled.div`
  width: 335px;
  /* height: 177px; */
  margin: 20px auto;
`;

const Warp = styled.div`
  /* width: 100%; */
  display: ${(props) => props.flex};
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  margin-left: ${(props) => props.marginLeft};
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
`;

const TimeLineCard = styled.div`
  /* width: 300px; */
  height: 50px;
  text-align: center;
  background-color: #ffdeeb;
  margin: auto;
  margin-top: 12px;
  border-radius: 10px;
`;


const Circle = styled.div`
	width: 48px;
	height: 48px;
	border-radius: 50%;
	background: #FFF0EE;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-left: 20px; */
  
	/* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
`;

const UserImg = styled.img`
  width: 25px;
  text-align: center;
  text-anchor: middle; 
`;

const Input = styled.input`
  width: 275px;
  height: 42px;
  border: 1px solid #E7E7E7;
  border-radius: 100px;
  padding: 12px 40px 12px 16px;
  margin-left: 12px;
  /* position: relative; */
  ::placeholder {
    font-weight: 500;
    font-size: 15px;
    color: #777777;
  }
`;

const SendImg = styled.img`
  position: absolute;
  /* left: 8.34%; */
  right: 13px;
  bottom: -6%;
  transform: translateY(-100%);
`;

const Button = styled.button`
	background: none;
	border: none;
`;