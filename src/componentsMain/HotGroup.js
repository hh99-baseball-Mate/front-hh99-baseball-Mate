import React from "react";
import styled from "styled-components";

const HotGroup = (props) => {

	return (
		<React.Fragment>
			<div style={{padding:"12px"}}>
				<p>지금 핫한 모임</p>
				<Card>
					롯데 경기 모여라
				</Card>
				<Card>
					롯데 경기 모여라
				</Card>
				<Card>
					롯데 경기 모여라
				</Card>
			</div>
		</React.Fragment>
	)
}

export default HotGroup;

const Card = styled.div`
	width: 100%;
	height: 100px;
	background-color: #ffc9c9;
	margin: 12px 0;
	border-radius: 10px;
`;