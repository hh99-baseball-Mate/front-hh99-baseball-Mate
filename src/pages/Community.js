import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommunityCard from "../communityList/CommunityCard";
import { Container, Header, MarginBottom, NaviBar, Text } from "../components";
import TimelineBanner from "../componentsTimeline/TimelineBanner";
import { history } from "../redux/configStore";
import { actionCreators as actionCr } from "../redux/modules/community";
const Community = (props) => {
  const dispatch = useDispatch();

  //카드 조회
  const card_list = useSelector((state) => state.community.card_list);
  const is_login = useSelector((state) => state.user.is_login);
  const newPeople = (e) => {
    !is_login
      ? window.alert("로그인 후 이용해주세요")
      : history.push("/community/communityadd");
    e.target.disabled = true;
  };

  //카드 조회
  useEffect(() => {
    dispatch(actionCr.getCardAPI());
  }, []);

  return (
    <div>
      <Header community />
      <TimelineBanner />
      <Container MainContainer>
        <Text bold size="16px">
          우리 같이 이야기 해봐요!
        </Text>
        {card_list.map((e) => {
          return (
            <CommunityCard
              onClick={() =>
                history.push(`/community/communitydetail/${e.communityId}`)
              }
              key={e.communityId}
              {...e}
            />
          );
        })}
      </Container>

      <MarginBottom />
      <NaviBar home writeBtn onClick={newPeople} />
    </div>
  );
};

export default Community;
