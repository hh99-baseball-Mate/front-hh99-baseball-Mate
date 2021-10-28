import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { timelineCreators } from "../redux/modules/timeline";

const LoadTimelime = React.memo((props) => {
	const dispatch = useDispatch();
	const timeline = useSelector((state) => state.timeline.timeline);
	const timeLineId = 174
	console.log("타임라인", timeline)


	useEffect(() => {
		dispatch(timelineCreators.loadTimelineMW());
		// return () => {
		// 	timeline;
		// }
	}, [timeline])

	const delTimeline = () => {
    dispatch(timelineCreators.delTimeline(timeLineId));
  };


	return (
		<React.Fragment>

			<Container>
			{
				timeline.map((timeline, idx) => {
					return (
						<Card timeline={timeline} key={idx}>
						</Card>
					)
				})
			}
			</Container>

		</React.Fragment>
	)
});

function Card(props) {
	return (
		<TimeLineCard>
			<Text>{props.timeline.userName}</Text>
			<Text>{props.timeline.content}</Text>
			<Text>{props.timeline.dayBefore}</Text>
			<Text>{props.timeline.likecount}</Text>
			<Text onClick={}>X삭제</Text>
		</TimeLineCard>
	)
}

export default LoadTimelime;

const Container = styled.div`
	width: 335px; 
	/* height: 177px; */
	margin: 20px auto;
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

const TimeLineCard = styled.div`
	/* width: 300px; */
	/* height: 50px; */
	text-align: center;
	background-color: #ffdeeb;
	margin: auto;
	margin-top: 12px;
	border-radius: 10px;
`;
