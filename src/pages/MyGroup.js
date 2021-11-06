import React from "react";
import styled from "styled-components";
import { ArrowBack, Container } from "../components";
import { history } from "../redux/configStore";

const MyGroup = (props) => {
  return (
    <div>
      <div style={{ background: "#EC5E4F", color: "#FFFFFF" }}>
        <Container>
          <ArrowBack>내모임</ArrowBack>
          <Group>
            <div>참여모임</div>
            <div>작성모임</div>
            <div>찜한모임</div>
          </Group>
        </Container>
      </div>
      <div style={{ margin: "20px" }}>
        <Box />
      </div>
    </div>
  );
};

export default MyGroup;

const Group = styled.div`
  display: flex;
  padding-right: 50px;
`;

const Box = styled.div`
  width: 335px;
  height: 134px;
  left: 20px;
  top: 184px;
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;
