import React from "react";
import styled from "styled-components";

const NavigationBar = (props) => {

	return (
		<React.Fragment>
			<NavBox>
				<p>홈</p>
				<p>내모임</p>
				<p>채팅</p>
				<p>마이</p>
			</NavBox>
		</React.Fragment>
	)
}

export default NavigationBar;

const NavBox = styled.div`
	max-width:"425px"; 
	height: 50px;
	background-color: #f1f3f5;
	margin-top: 5px;
	display: flex;
	position: fixed;
	bottom: 0px;
	left: 0px;
	right: 0px;
	justify-content: space-around;
	align-items: center;
`;