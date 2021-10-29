import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

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

	const addTimeline = () => {
		dispatch(timelineCreators.addTimelineMW(message));
		setMessage("");
	};

	// useEffect(() => {
	// 	dispatch(timelineCreators.deleteTimelineMW(props.id));
	// }, [])


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

			{/* 타임라인 리스트 */}
			<List>
				{
					timeline.map((timeline, idx) => {
						return (
							<Timeline key={idx} {...timeline} {...likeState}>
							</Timeline>
						)
					})
				}
			</List>

			{/* 타임라인 작성 */}
      {/* <Container>
        <textarea  cols="50" rows="2"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></textarea>
        <button onClick={() => {addTimeline()}}
				>타임라인 작성</button>
      </Container> */}
			
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
 	height: 90vh;
	overflow: auto;
`;