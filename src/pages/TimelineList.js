import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Header } from "../components"
import Timeline from "../componentsTimeline/Timeline"
import TimelimeWrite from "../componentsTimeline/TimelineWrite"
import { MarginBottom, NaviBar } from "../components"
import { timelineCreators } from "../redux/modules/timeline"
import eventBanner from "../shared/icon/logo/timeLineBanner.png"

const TimelineList = React.memo((props) => {
  const dispatch = useDispatch()
  const timeline = useSelector((state) => state.timeline.timeline)
  // const likeState = useSelector((state) => state.timeline.like);
  const user = useSelector((state) => state.user.user_info)
  const likelist = useSelector((state) => state.timeline.likelist)

  // console.log(timeline)
  // console.log("likelist", likelist)
  useEffect(() => {
    dispatch(timelineCreators.loadTimelineMW())
    dispatch(timelineCreators.likeListMW())
  }, [])

  return (
    <React.Fragment>
      <Container>
        {/* 헤더 */}
        <Header timeline />

        {/* 배너 */}
        {/* <TimelineBanner /> */}
        <Banner src={eventBanner} alt="" />

        <Warp padding="0 20px">
          {/* 타임라인 작성 & 응원갯수 */}
          <TimelimeWrite />

          <Box>
            {/* 타임라인 리스트 */}
            <List>
              {timeline.map((timeline, idx) => {
                return (
                  <Timeline
                    key={timeline.timelineId}
                    {...timeline}
                    user={user}
                    likelist={likelist}
                    idx={idx}
                  ></Timeline>
                )
              })}
            </List>
          </Box>

        </Warp>
      </Container>

      {/* 하단 네비바 */}
      <MarginBottom />
      <NaviBar />
    </React.Fragment>
  )
})

export default TimelineList

const Container = styled.div`
  max-width: 425px;
  width: 100%;
  /* height: 177px; */
  margin: auto;
`

const Box = styled.div`
  width: 100%;
  max-height: 594px;
  overflow: auto;
  height: ${(props) => props.height};
  background: ${(props) => props.background};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
  margin-bottom: ${(props) => props.bottom};
  display: ${(props) => props.flex};
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  position: ${(props) => props.position};
`

const Warp = styled.div`
  /* width: 100%; */
  display: ${(props) => props.flex};
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  margin-left: ${(props) => props.marginLeft};
  margin-bottom: ${(props) => props.bottom};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  position: ${(props) => props.position};
`

const Text = styled.div`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
  letter-spacing: ${(props) => props.spacing};
  margin: ${(props) => props.margin};
  margin-bottom: ${(props) => props.bottom};
`

const Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid #e7e7e7;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
`

const List = styled.div`
  max-height: 100%;
  /* overflow: auto; */
  /* NaviBar안겹치게 */
  /* margin-bottom: 94px; */
`

const Banner = styled.img`
  width: 100%;
`