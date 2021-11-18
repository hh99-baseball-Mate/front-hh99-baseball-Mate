import React from "react";
import CommunityCard from "../communityList/CommunityCard";
import { Container, Header, NaviBar, Text } from "../components";
import TimelineBanner from "../componentsTimeline/TimelineBanner";
import { PancilBtn } from "../components";

const Community = (props) => {
  return (
    <div>
      <Header timeline />
      <TimelineBanner />
      <Container MainContainer>
        <Text bold size="16px">
          우리 같이 이야기 해봐요!
        </Text>
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
      </Container>
      <NaviBar home />
    </div>
  );
};

export default Community;
