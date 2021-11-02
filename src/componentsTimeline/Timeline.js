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
	const idx = props.idx
	// console.log("username", props.user.username)

	const Me = props.user.username 

	const delTimeline = () => {
		// const timeLineId = props.id
		if (window.confirm("정말 삭제하시겠습니까?") === true) {
			dispatch(timelineCreators.deleteTimelineMW(props.id));
		}
  };

	return (
		<React.Fragment>

			<Container>
				<TimeLineCard idx={idx}>
					<Warp align="center">
						<div>
							<Circle />
						</div>
						
						<Box>
							<Warp align="flex-end">
								<Text size="14px" weight="bold" marginR="10px" >
									{props.userName}
								</Text>
								<Text color="#C4C4C4" size="12px">
									{props.dayBefore}
								</Text>
							</Warp>
							
							<Warp>
								{ 
									Me === props.userName ?
									(<Text onClick={delTimeline}>❌</Text>) : ""
								}
							</Warp>

							{/* <p onClick={()=>{
								setLike(!like)
								dispatch(timelineCreators.likeTimelineMW(props.id, like))
							}}>
								{like === true ? <p>😍</p> : <p>🤨</p>}
							</p>
							<Text>{props.likecount}</Text> */}

								<Text size="14px">
									{props.content}
								</Text>
						</Box>

					</Warp>
					
					

					
				</TimeLineCard>
			</Container>

		</React.Fragment>
	)
});


export default React.memo(Timeline);

const Container = styled.div`
	width: 335px; 
	/* height: 57px; */
	/* margin-bottom: 5px; */
	margin: auto;
`;

const Warp = styled.div`
	/* width: 100%; */
	/* display: ${(props) => props.flex}; */
	display: flex;
	flex-direction: ${(props) => props.direction};
	justify-content: ${(props) => props.justify};
	align-items: ${(props) => props.align};
	margin-left: ${(props) => props.marginLeft};
	margin: ${(props) => props.margin};
	padding: ${(props) => props.padding};
	position: ${(props) => props.position};
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

const Text = styled.p`
	font-size: ${(props) => props.size};
	font-weight: ${(props) => props.weight};
	color: ${(props) => props.color};
	letter-spacing: ${(props) => props.spacing};
	margin: ${(props) => props.margin};
	margin-right: ${(props) => props.marginR};
	cursor: ${(props) => props.pointer};
	line-height: ${(props) => props.height};
	/* text-align: center; */
`;

const TimeLineCard = styled.div`
	${(props) => props.idx % 2 === 0 ? `background: #FFF0EE;`: `background: #F2FAFC;`}
	border: 1px solid #E7E7E7;

	margin-top: 5px;
	border-radius: 10px;
	padding: 10px;
`;

const Circle = styled.div`
	width: 29px;
	height: 29px;
	border-radius: 50%;
	background: #C4C4C4;
	margin-top: ${(props) => props.marginT};
	margin-right: 10px;
`;
