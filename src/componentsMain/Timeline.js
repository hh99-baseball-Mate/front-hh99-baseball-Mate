import React from "react";
import styled from "styled-components";

const Timeline = (props) => {

	return (
		<React.Fragment>
			<div style={{padding:"12px"}}>
				<p>타임라인</p>
				<TimeLineCard>
				누가 이기고있나요?
				</TimeLineCard>
				<TimeLineCard>
				누가 이기고있나요?
				</TimeLineCard>
				<TimeLineCard>
				누가 이기고있나요?
				</TimeLineCard>
			</div>
		</React.Fragment>
	)
}

export default Timeline;

const TimeLineCard = styled.div`
	/* width: 300px; */
	height: 50px;
	text-align: center;
	background-color: #ffdeeb;
	margin: auto;
	margin-top: 12px;
	border-radius: 10px;
`;

