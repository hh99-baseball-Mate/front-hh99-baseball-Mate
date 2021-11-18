import React from "react";
import styled from "styled-components";
import CommunityCard from "../communityList/CommunityCard";
import { ArrowBack, Container } from "../components";

export const CommunityDetail = (props) => {
  return (
    <div>
      <ArrowBack>커뮤니티</ArrowBack>
      <Border />
      <Container>
        <CommunityCard />
      </Container>
    </div>
  );
};

const Border = styled.div`
  width: 100%;
  border: 1px solid #e7e7e7;
`;
