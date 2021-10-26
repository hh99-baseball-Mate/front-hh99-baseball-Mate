import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom"

const Header = (props) => {

	const history = useHistory();

	return(
		<React.Fragment>
			<DivFlex>
				<P>추천</P>
				<P>모임</P>
				<P>소식</P>
				<P>굿즈</P>
			</DivFlex>
		</React.Fragment>
	)
}

export default Header;

const DivFlex = styled.div`
	display: flex;
`;

const P = styled.p`
	margin: 12px;
`;
