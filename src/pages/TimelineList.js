import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Header } from "../components";
import TimelineBanner from "../componentsTimeline/TimelineBanner";
import Timeline from "../componentsTimeline/Timeline";
import TimelimeWrite from "../componentsTimeline/TimelineWrite";
import NaviBar from "../components/NaviBar";
import { timelineCreators } from "../redux/modules/timeline";


const TimelineList = React.memo((props) => {

	const dispatch = useDispatch();
	const timeline = useSelector((state) => state.timeline.timeline);
	// const likeState = useSelector((state) => state.timeline.like);
	const user = useSelector((state) => state.user.user_info);
	const likelist = useSelector((state) => state.timeline.likelist);

	// console.log("likelist",likelist)
	useEffect(() => {
		dispatch(timelineCreators.loadTimelineMW());
	}, [])

	useEffect(() => {
		dispatch(timelineCreators.likeListMW());
	}, [])

	// const reloadBtn = () => {
	// 	dispatch(timelineCreators.loadTimelineMW())
	// }

	return (
		<React.Fragment>
			<Container>

				{/* 헤더 */}
				<Header nowBtn3="nowBtn3" />

				{/* 배너 */}
				<TimelineBanner />

				<Warp padding="0 20px" >

					{/* 타임라인 작성 & 응원갯수 */}			
					<TimelimeWrite  />

					{/* 타임라인 리스트 */}
					<List>
						{
							timeline.map((timeline, idx) => {
								return (
									<Timeline key={idx} {...timeline} user={user} likelist={likelist} idx={idx}>
									</Timeline>
								)
							})
						}
					</List>
				</Warp>
					
			
			</Container>

			{/* 하단 네비바 */}
			<NaviBar/>
		</React.Fragment>
	)
});

export default TimelineList;

const Container = styled.div`
	width: 375px; 
	/* height: 177px; */
	margin: auto;
`;

const Box = styled.div`
	width: 100%;
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
`;

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
`;

const Text = styled.div`
	font-size: ${(props) => props.size};
	font-weight: ${(props) => props.weight};
	color: ${(props) => props.color};
	letter-spacing: ${(props) => props.spacing};
	margin: ${(props) => props.margin};
	margin-bottom: ${(props) => props.bottom};
`;

const Circle = styled.div`
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background: #FFFFFF;
	border: 1px solid #E7E7E7;
  display: flex;
  justify-content: center;
  align-items: center;
	margin-left: 8px;
`;

const List = styled.div`
 	height: 62vh;
	overflow: auto;
	/* NaviBar안겹치게 */
	margin-bottom: 94px;
`;