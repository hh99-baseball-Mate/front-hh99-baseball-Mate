import React from "react";
import styled from "styled-components";
import { ArrowBack, Container } from "../components";
import { history } from "../redux/configStore";

const MyGroup = (props) => {
  return (
    <div>
      <Container>
        <ArrowBack
          onClick={() => {
            history.push("/");
          }}
          style={{ background: "#EC5E4F" }}
        >
          내모임
        </ArrowBack>
        <Group>
          <div>참여모임</div>
          <div>작성모임</div>
          <div>찜한모임</div>
        </Group>
      </Container>
    </div>
  );
};

export default MyGroup;

const Group = styled.div`
  display: flex;
`;
