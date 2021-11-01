import React, { useEffect } from "react";
import styled from "styled-components";
import { Buttons, Container, Header } from "../components";

import { useDispatch, useSelector } from "react-redux";
import group from "../redux/modules/group";
import Position from "../icon/Vector.png";
import { history } from "../redux/configStore";
import { Image } from "react-bootstrap";

const GroupDate = (props) => {
  const dispatch = useDispatch();

  function BackGo() {
    history.push("/GroupList");
  }

  const play_list = useSelector((state) => state.group.play_list);
  console.log(play_list);
  // useEffect(() => {
  //   dispatch(playCr.getPlayAPI());
  // }, []);
  return (
    <Container margin="0px auto">
      <Header
        onClick={() => {
          history.push("/grouplist");
        }}
      >
        일정선택
      </Header>
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
            roundedCircle
            style={{
              width: "37px",
              height: "37px",
              background: "#FFFFFF",
              border: "1px solid #E7E7E7",
              boxSizing: "border-box",
              borderRadius: "50%",
            }}
          />
          <div>구단명</div>
        </Col>
        <Col>
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUHouNAtA1H98cZK9ZdkNoxzGmNhDCF4pzMQ&usqp=CAU"
            roundedCircle
            style={{
              width: "37px",
              height: "37px",
              background: "#FFFFFF",
              border: "1px solid #E7E7E7",
              boxSizing: "border-box",
              borderRadius: "50%",
            }}
          />
          <div>구단명</div>
        </Col>
        <div style={{ position: "fixed", width: "335px", bottom: "20px" }}>
          <Buttons complete>선택완료</Buttons>
        </div>
      </Box>
      {/* </div>
      ))} */}
    </Container>
  );
};

export default GroupDate;

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
  display: flex;
  align-items: center;
`;
