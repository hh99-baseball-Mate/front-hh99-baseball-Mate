import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { timelineCreators } from "../redux/modules/timeline";

const LoadTimelime = React.memo((props) => {
	const dispatch = useDispatch();
	// const timeline = useSelector((state) => state.timeline.timeline);
	// const timeLineId = 174
	// console.log("타임라인", timeline)
	// console.log("메세지", props.message)


	// useEffect(() => {
	// 	dispatch(timelineCreators.loadTimelineMW());
	// 	// return () => {
	// 	// 	timeline;
	// 	// }
	// }, [timeline])


	const id = props.id;
	const userName = props.userName;
	const content = props.content;
	const dayBefore = props.dayBefore;
	const likecount = props.likecount;

	console.log(id, userName, content, dayBefore, likecount)

	const delTimeline = () => {
		// const timeLineId = props.id
    dispatch(timelineCreators.deleteTimelineMW(props.id));
  };


	return (
		<React.Fragment>

			<Container>
			{/* {
				timeline.map((timeline, idx) => {
					return (
						<Card timeline={timeline} key={idx}>
						</Card>
					)
				})
			} */}
				<TimeLineCard>
					<Text>{props.userName}</Text>
					<Text>{props.content}</Text>
					<Text>{props.dayBefore}</Text>
					<Text>{props.likecount}</Text>
					<Text onClick={delTimeline}>X삭제</Text>
				</TimeLineCard>
			</Container>

		</React.Fragment>
	)
});

// function Card(props) {
// 	const dispatch = useDispatch();
// 	console.log("아이디",props.timeline.id)

// 	const delTimeline = () => {
//     dispatch(timelineCreators.delTimeline(props.timeline.id));
//   };

// 	return (
// 		<TimeLineCard>
// 			<Text>{props.timeline.userName}</Text>
// 			<Text>{props.timeline.content}</Text>
// 			<Text>{props.timeline.dayBefore}</Text>
// 			<Text>{props.timeline.likecount}</Text>
// 			<Text onClick={delTimeline}>X삭제</Text>
// 		</TimeLineCard>
// 	)
// }

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
