import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import TimelineList from "../componentsTimeline/TimelineList";
import TimelimeWrite from "../componentsTimeline/TimelineWrite";
import { timelineCreators } from "../redux/modules/timeline";

const Timeline = (props) => {
	const dispatch = useDispatch();
	const timeline = useSelector((state) => state.timeline.timeline);
	console.log(timeline)
	// const [message, setMessage] = useState("");

	useEffect(() => {
		dispatch(timelineCreators.loadTimelineMW());
		return () => {
			// TimelineList;
		}
	}, [])

	return (
		<Container>

				<Warp flex="flex" justify="space-between">
					<Text size="16px" weight="bold">
						생생 타임라인 💬
					</Text>
					<Text size= "12px" weight= "500px" color="#C4C4C4">
						+ More
					</Text>
				</Warp>

				{
					timeline.map((timeline, idx) => {
						return (
							<TimelineList key={idx} {...timeline}>
							</TimelineList>
						)
					})
				}
			
				<TimelimeWrite/>


		</Container>
	)
}

export default Timeline;

const Container = styled.div`
	width: 375px; 
	/* height: 177px; */
	margin: auto;
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