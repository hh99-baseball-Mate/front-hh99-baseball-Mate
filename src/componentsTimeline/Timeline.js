import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { timelineCreators } from "../redux/modules/timeline";
import { mainCreators } from "../redux/modules/mainPage";

const Timeline = React.memo((props) => {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user.user_info)
	
	useEffect(() => {
		dispatch(timelineCreators.loadTimelineMW());
		dispatch(timelineCreators.likeTimelineMW());
	}, [])

	// useEffect(() => {
	// 	dispatch(mainCreators.loadMainTimelineMW(5))
	// }, [])


	const [like, setLike] = useState(false)
	const idx = props.idx

	// 좋아요 누른 상태
	// console.log("props.likelist", props.likelist)
	const num = props.id
	const likelist = props.likelist

	// const 좋아요확인 = likelist.indexOf(props.id)
	// console.log("아이디", typeof(id), num)
	// console.log("likeId",typeof(좋아요확인) ,좋아요확인)

	// if (props.id === 

	// 본인 아이디 확인
	// const Me = props.user.username 
	const Me = user.username 

	const delTimeline = () => {
		// const timeLineId = props.id
		if (window.confirm("정말 삭제하시겠습니까?") === true) {
			dispatch(timelineCreators.deleteTimelineMW(props.id));
		}
  };

	// let like = false;
	const likeToggle = () => {
		setLike(!like)
		dispatch(timelineCreators.likeTimelineMW(props.id, like))
	}

	return (
		<React.Fragment>

			<Container>
				<TimeLineCard idx={idx}>
					{/* <Warp align="center"> */}
						{/* <div>
							<Circle />
						</div> */}
						
						<Box>
							<Warp justify="space-between" align="center" bottom="7px">
								<Warp align="flex-end">
									<Text size="14px" weight="bold" marginR="10px" >
										{Me}
									</Text>
									<Text color="#C4C4C4" size="12px">
										{props.dayBefore}
									</Text>
								</Warp>
								
								<Warp>
									{ 
										Me === props.userName ?
										(<Text size="10px" onClick={delTimeline}>❌</Text>) : ""
									}
								</Warp>
							</Warp>

							<Text size="14px" style={{overflowWrap:"break-word"}}>
								{props.content}
							</Text>

							<Warp justify="flex-end">
								<Text size="12px" 
								onClick={
									likeToggle
								}>
									{ like ? `😍` : `😶` }
								</Text>
								<Text size="12px" marginL="5px">
									{props.likecount}
								</Text>
							</Warp>
						</Box>

					{/* </Warp> */}
					
				</TimeLineCard>
			</Container>

		</React.Fragment>
	)
});


export default React.memo(Timeline);

const Container = styled.div`
	/* width: 335px;  */
	/* height: 57px; */
	/* margin-bottom: 5px; */
	/* margin: auto; */
`;

const TimeLineCard = styled.div`
	${(props) => props.idx % 2 === 0 ? `background: #FFF0EE;`: `background: #F2FAFC;`}
	border: 1px solid #E7E7E7;
	margin-bottom: 10px;
	border-radius: 10px;
	padding: 12px 14px;
`;

const Warp = styled.div`
	/* width: 100%; */
	/* display: ${(props) => props.flex}; */
	display: flex;
	flex-direction: ${(props) => props.direction};
	justify-content: ${(props) => props.justify};
	align-items: ${(props) => props.align};
	margin-left: ${(props) => props.marginLeft};
	margin-bottom: ${(props) => props.bottom};
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
	margin-left: ${(props) => props.marginL};
	cursor: ${(props) => props.pointer};
	line-height: ${(props) => props.height};
	/* text-align: center; */
`;

const Circle = styled.div`
	width: 29px;
	height: 29px;
	border-radius: 50%;
	background: #C4C4C4;
	margin-top: ${(props) => props.marginT};
	margin-right: 10px;
`;
