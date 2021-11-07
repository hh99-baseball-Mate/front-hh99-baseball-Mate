import React from "react";
import styled from "styled-components";
import GroupCard from "../commponentAdd/GroupCard";
import { ArrowBack, Container } from "../components";
import { history } from "../redux/configStore";

const MyGroup = (props) => {
  return (
    <div>
      <div
        style={{
          background: "#EC5E4F",
          color: "#FFFFFF",
          maxWidth: "375px",
          margin: " 0 auto",
        }}
      >
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
        <GroupCard />
      </div>
    </div>
  );
};

export default MyGroup;

const Group = styled.div`
  display: flex;
  padding-right: 50px;
`;
