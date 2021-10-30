import React from "react";
import styled from "styled-components";

const MainTimeline = (props) => {

	return (
		<React.Fragment>
			<Container>

				{/* 타임라인 리스트 */}
				<TimeLineCard>
					{props.userName}
					{props.content}
					{props.dayBefore}
					{props.likecount}
				</TimeLineCard>

			</Container>
		</React.Fragment>
	)
}

export default MainTimeline;

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
	height: 50px;
	text-align: center;
	background-color: #ffdeeb;
	margin: auto;
	margin-top: 12px;
	border-radius: 10px;
`;

