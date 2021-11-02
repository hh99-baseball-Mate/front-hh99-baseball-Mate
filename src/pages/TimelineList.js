import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { Header } from "../components";
import Timeline from "../componentsTimeline/Timeline";
import TimelimeWrite from "../componentsTimeline/TimelineWrite";
import { timelineCreators } from "../redux/modules/timeline";

const TimelineList = React.memo((props) => {
	const dispatch = useDispatch();
	const timeline = useSelector((state) => state.timeline.timeline);
	const likeState = useSelector((state) => state.timeline.like);
	const [message, setMessage] = useState("");

	useEffect(() => {
		dispatch(timelineCreators.loadTimelineMW());
	}, [])

	return (
		<Container>

			<Header nowBtn3="nowBtn3" />
			<Box height="62px" background="#777777">
				상영중인 경기 정보
			</Box>

			{/* <Warp flex="flex" justify="space-between">
				<Text size="16px" weight="bold">
					생생 타임라인 💬
				</Text>
				<Text size= "12px" weight= "500px" color="#C4C4C4">
					+ More
				</Text>
			</Warp> */}

			{/* 타임라인 리스트 */}
			<List>
				{
					timeline.map((timeline, idx) => {
						return (
							<Timeline key={idx} {...timeline} {...likeState} idx={idx}>
							</Timeline>
						)
					})
				}
			</List>

			{/* 타임라인 작성 */}			
			<TimelimeWrite/>

		</Container>
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

const List = styled.div`
 	height: 87vh;
	overflow: auto;
`;