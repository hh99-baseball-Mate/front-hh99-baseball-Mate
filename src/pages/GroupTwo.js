import React from "react";
import styled from "styled-components";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsCircle } from "react-icons/bs";
import { Button } from "react-bootstrap";

const GroupTwo = (props) => {
  return (
    <>
      <AiOutlineArrowLeft></AiOutlineArrowLeft>

      <Title>일정 선택</Title>
      <div>
        <BsCircle style={{ width: "50px", height: "50px" }}></BsCircle>
        vs
        <BsCircle style={{ width: "50px", height: "50px" }}></BsCircle>
      </div>
      <div style={{ float: "left" }}>2021-10-10 00:00:00</div>
      <CenterInfo>
        <div className="d-grid gap-2">
          <Button variant="primary" style={{ padding: "10px 70px" }}>
            선택
          </Button>
        </div>
      </CenterInfo>
    </>
  );
};

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
  }
`;
