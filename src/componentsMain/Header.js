import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom"

const Header = (props) => {

	const history = useHistory();

	return(
		<React.Fragment>
			<DivFlex>
				<p>추천</p>
				<p>모임</p>
				<p>소식</p>
				<p>굿즈</p>
			</DivFlex>
		</React.Fragment>
	)
}

export default Header;

const DivFlex = styled.div`
	display: flex;
	justify-content: space-between;
	width: 196px;
	height: 26px;
	margin: 14px 14px 14px 26px;
	p {
		font-size: 18px;
	}
`;

// const Box = styled.div`
// 	font-size: 18px;
// 	margin: 
// `;
