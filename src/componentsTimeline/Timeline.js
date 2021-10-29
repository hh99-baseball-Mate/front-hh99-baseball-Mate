import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { timelineCreators } from "../redux/modules/timeline";

const Timeline = React.memo((props) => {
	const dispatch = useDispatch();
	
	useEffect(() => {
		dispatch(timelineCreators.loadTimelineMW());
	}, [])

	useEffect(() => {
		dispatch(timelineCreators.likeTimelineMW());
	}, [])

	const [like, setLike] = useState(false)

	const id = props.id;
	const userName = props.userName;
	const content = props.content;
	const dayBefore = props.dayBefore;
	const likecount = props.likecount;
	const likeState = props.likeState

	// const love =  😍;
	console.log("likeState",likeState)
	console.log(id, userName, content, dayBefore, likecount)

	const delTimeline = () => {
		// const timeLineId = props.id
		if (window.confirm("정말 삭제하시겠습니까?") === true) {
			dispatch(timelineCreators.deleteTimelineMW(props.id));
		}
  };



	// const likeTimeline = () => {

	// 	dispatch(timelineCreators.likeTimelineMW(id, like))
	// }


	return (
		<React.Fragment>

			<Container>
				<TimeLineCard>
					<Text>{props.userName}</Text>
					<Text>{props.content}</Text>
					<Text>{props.dayBefore}</Text>
					
					<p onClick={()=>{
						setLike(!like)
						dispatch(timelineCreators.likeTimelineMW(props.id, like))
					}}>
						
						{like === true ? <p>😍</p> : <p>🤨</p>}
					</p>
					
					<Text>{props.likecount}</Text>
				
					<Text onClick={delTimeline}>X삭제</Text>
				</TimeLineCard>
			</Container>
			{/* 🤨 */}
		</React.Fragment>
	)
});


export default React.memo(Timeline);

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
