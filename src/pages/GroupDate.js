import React, { useEffect } from "react";
import styled from "styled-components";
import { Card } from "react-bootstrap";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsCircle } from "react-icons/bs";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import group from "../redux/modules/group";
import { actionCreators as playCr } from "../redux/modules/group";
import Position from "../icon/Vector.png";
import { Image } from "react-bootstrap";

const GroupDate = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  function BackGo() {
    history.push("/GroupList");
  }

  const play_list = useSelector((state) => state.group.play_list);
  console.log(play_list);
  // useEffect(() => {
  //   dispatch(playCr.getPlayAPI());
  // }, []);
  return (
    <>
      <AiOutlineArrowLeft onClick={BackGo}></AiOutlineArrowLeft>
      {/* <>qwjeqw</> */}
      <Title>일정 선택</Title>
      {/* {play_list.map((e, i) => (
        <div key={i}> */}
      <Box>
        <Dat>날짜랑 요일</Dat>
        <Local>
          <img src={Position} alt="위치" />
          위치
        </Local>
        <Col>
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUHouNAtA1H98cZK9ZdkNoxzGmNhDCF4pzMQ&usqp=CAU"
            style={{
              width: "50px",
              background: "#FFFFFF",
              border: "1px solid #E7E7E7",
              boxizing: "border-box;",
            }}
            roundedCircle
          />
          <div float="left">구단명</div>
        </Col>
        <Col>
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUHouNAtA1H98cZK9ZdkNoxzGmNhDCF4pzMQ&usqp=CAU"
            style={{
              width: "50px",
              background: "#FFFFFF",
              border: "1px solid #E7E7E7",
              boxizing: "border-box;",
            }}
            roundedCircle
          />
          구단명
        </Col>
      </Box>
      {/* </div>
      ))} */}
    </>
  );
};

export default GroupDate;

const Title = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: 600;
`;

const Dat = styled.div`
  font-weight: bold;
  font-size: 13px; ;
`;

const Box = styled.div`
  width: 275px;
  height: 177px;
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

const Local = styled.div`
  color: #777777;
  font-size: 12px;
`;

const Col = styled.div`
  // flex-direction: column;
  display: flex;
  align-items: center;
`;
