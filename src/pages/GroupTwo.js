import React from "react";
import styled from "styled-components";
import { Card } from "react-bootstrap";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsCircle } from "react-icons/bs";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Header } from "../components/"

const GroupTwo = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  function BackGo() {
    history.push("/groupone")
  }
  return (
    <>
      <div style={{ margin: "30px 0 0 0" }}>
        <Header>일정 선택</Header>
        {/* <AiOutlineArrowLeft onClick={BackGo}></AiOutlineArrowLeft>
      {/* <>qwjeqw</> */}
        {/* <Title>일정 선택</Title> */}
      </div>
      <Dat>날짜와 요일</Dat>

      <CardAll>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>
              <strong>00:00</strong> 0강
            </Card.Title>

            <Card.Text>
              <BsCircle
                style={{
                  width: "37px",
                  height: "37px",
                  left: "75px",
                  top: "219px",
                  display: "flex",
                }}
              ></BsCircle>
              <div>구단명</div>
              <BsCircle
                style={{
                  position: "flex",
                  width: "37px",
                  height: "37px",
                  left: "75px",
                  top: "270px",
                }}
              ></BsCircle>
              <div float="left">구단명</div>
            </Card.Text>
          </Card.Body>
        </Card>

        <div style={{ float: "left" }}>2021-10-10 00:00:00</div>
        <CenterInfo>
          <div className="d-grid gap-2">
            <Button variant="primary" style={{ padding: "10px 70px" }}>
              선택
            </Button>
          </div>
        </CenterInfo>
      </CardAll>
    </>
  )
}

export default GroupTwo;

const Title = styled.div`
  text-align: center;
  font-size: 30px;
  font-weight: 600;
`;
const CenterInfo = styled.ul`
position:fixed;
left:0;
bottom:0;
width:100%;
height:32px;
margin-left:50px;
`;

const Dat = styled.div`
  font-weight: bold;
  font-size: 20px;
`;

const CardAll = styled.div`
  position: absolute;
  left: 14.67%;
  right: 12%;
  top: 17.86%;
  bottom: 60.34%;
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;
