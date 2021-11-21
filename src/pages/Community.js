import React from "react";
import { useSelector } from "react-redux";
import CommunityCard from "../communityList/CommunityCard";
import { Container, Header, MarginBottom, NaviBar, Text } from "../components";
import TimelineBanner from "../componentsTimeline/TimelineBanner";
import { history } from "../redux/configStore";
const Community = (props) => {
  const is_login = useSelector((state) => state.user.is_login);
  const newPeople = (e) => {
    !is_login
      ? window.alert("로그인 후 이용해주세요")
      : history.push("/grouplist/groupadd");
    e.target.disabled = true;
  };

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

      <MarginBottom/>
      <NaviBar home writeBtn onClick={newPeople} />
    </div>
  );
};

export default Community;
