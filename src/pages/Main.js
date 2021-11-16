import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { mainCreators } from "../redux/modules/mainPage";
import { timelineCreators } from "../redux/modules/timeline";
import { useHistory } from "react-router-dom";

import { Header } from "../components";
// import Banner from "../componentsMain/Banner";
import HotGroup from "../componentsMain/HotGroup";
import GroupCard from "../componentsGroupList/GroupCard";
// import MainTimeline from "../componentsMain/MainTimeline";
import TimelineBanner from "../componentsTimeline/TimelineBanner";
import Timeline from "../componentsMain/Timeline";
import TimelimeWrite from "../componentsTimeline/TimelineWrite";
import { Card } from "../componentsGoods/Card";
import { Footer, MarginBottom, NaviBar } from "../components";
import TimelineList from "./TimelineList"
import { Banner } from "../components/Banner";

const Main = memo((props) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const hotGroup = useSelector((state) => state.mainPage.hotGroup);
  const mainTimeline = useSelector((state) => state.mainPage.mainTimeline);
  const likelist = useSelector((state) => state.timeline.likelist);
  const user = useSelector((state) => state.user.user_info);

  const [close, setClose] = useState(false)

  useEffect(() => {
    dispatch(mainCreators.hotGroupMW(4));
  }, []);

  // useEffect(() => {
  // 	dispatch(timelineCreators.loadTimelineMW());
  // }, [])

  useEffect(() => {
    dispatch(mainCreators.loadMainTimelineMW(5));
  }, []);

  // console.log("mainTimeline",mainTimeline)
  // console.log("hotGroup", hotGroup);

  return (
    <React.Fragment>
      <Container>

        {/* 헤더 네비 */}
        <Header nowBtn1 />

        {/* 야구 일정 */}
        {/* <Banner /> */}
        <Banner/>

        {/* 핫한 모임 타이틀 */}
        <Box>
          <Warp justify="space-between" align="center" margin="0 0 13px 0">
            <Text size="16px" weight="bold">
              지금 핫한 모임 🔥
            </Text>

            <Button>
              <Text
                size="12px"
                weight="500px"
                color="#C4C4C4"
                onClick={() => {
                  history.push("/grouplist")
                }}
              >
                + More
              </Text>
            </Button>
          </Warp>
        </Box>

        {/* 핫한 모임 리스트 */}
        {hotGroup.map((hotGroup, idx) => {
          return <GroupCard key={idx} {...hotGroup} close={close} setClose={setClose} />;
        })}

        {/* 구분선 */}
        <Rectangle />

        {/* 타임라인 타이틀 */}
        <Box>
          <Warp bottom="7px" justify="space-between">
            <Text size="16px" weight="bold">
              생생 타임라인 💬
            </Text>

            <Button>
              <Text
                size="12px"
                weight="500px"
                color="#C4C4C4"
                onClick={() => {
                  history.push("/timeline")
                }}
              >
                + More
              </Text>
            </Button>
          </Warp>

          <Text size="14px" color="#777777">
            실시간으로 응원해보세요
          </Text>
        </Box>

        {/* 타임라인 배너 */}
        <TimelineBanner />
        <Box>
          {/* 타임라인 작성 & 갯수 */}
          {/* <TimelimeWrite /> */}

          {/* 타임라인 리스트 */}
          {mainTimeline.map((mainTimeline, idx) => {
            return (
              <Timeline
                key={idx}
                {...mainTimeline}
                likelist={likelist}
                user={user}
                idx={idx}
              ></Timeline>
            );
          })}
          {/* <TimelineList/> */}
        </Box>

        {/* 구분선 */}
        <Rectangle />

        {/* 굿즈 타이틀 */}
        <Box>
          <Warp bottom="7px" justify="space-between">
            <Text size="16px" weight="bold">
              굿즈 자랑하기 👀
            </Text>

            <Button>
              <Text
                size="12px"
                weight="500px"
                color="#C4C4C4"
                onClick={() => {
                  history.push("/goods")
                }}
              >
                + More
              </Text>
            </Button>
          </Warp>

          <Text size="14px" color="#777777">
            소장중인 굿즈 보고가세요!
          </Text>
        </Box>

        {/* 굿즈 리스트 */}
        <Box padding="28px 20px 40px 20px">
          <CardContainer>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </CardContainer>
        </Box>

        {/* 푸터 */}
        <Footer />

        {/* 하단 네비바 */}
        <MarginBottom/>
        <NaviBar home="home" />
      </Container>
    </React.Fragment>
  )
});

export default Main;

const Container = styled.div`
  width: 375px;
  /* background-size: cover; */
  /* height: auto; */
  margin: auto;
  padding: 0;
  position: relative;
`;

const Rectangle = styled.div`
  background: #e7e7e7;
  width: 100%;
  height: 6px;
`;

const Box = styled.div`
  width: 335px;
  /* height: 177px; */
  margin: 20px auto;
`;

// const Warp = styled.div`
//   /* width: 100%; */
//   display: ${(props) => props.flex};
//   flex-direction: ${(props) => props.direction};
//   justify-content: ${(props) => props.justify};
//   align-items: ${(props) => props.align};
//   margin-left: ${(props) => props.marginLeft};
//   margin: ${(props) => props.margin};
//   padding: ${(props) => props.padding};
//   position: ${(props) => props.position};
// `;

const Warp = styled.div`
  display: flex;
  width: ${(props) => props.width};
  flex-direction: ${(props) => props.direction};
  flex-wrap: ${(props) => props.wrap};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  align-content: ${(props) => props.start};
  margin-left: ${(props) => props.marginLeft};
  margin-bottom: ${(props) => props.bottom};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  position: ${(props) => props.position};
`;

const Text = styled.div`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
  letter-spacing: ${(props) => props.spacing};
  margin: ${(props) => props.margin};
`;

const TimeLineCard = styled.div`
  /* width: 300px; */
  height: 50px;
  text-align: center;
  background-color: #ffdeeb;
  margin: auto;
  margin-top: 12px;
  border-radius: 10px;
`;

const Button = styled.button`
  background: none;
  border: none;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
`;
