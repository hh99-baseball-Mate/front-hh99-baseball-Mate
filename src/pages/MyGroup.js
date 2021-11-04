import React from "react";
import { ArrowBack, Container } from "../components";

const MyGroup = (props) => {
  return (
    <div>
      <Container>
        <ArrowBack style={{ background: "#EC5E4F" }}>내모임</ArrowBack>
        <div>참여모임</div>
        <div>작성모임</div>
        <div>찜한모임</div>
      </Container>
    </div>
  );
};

export default MyGroup;
