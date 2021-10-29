import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom"

const Header = (props) => {

	const history = useHistory();

	return(
		<React.Fragment>
			<Box>
				<Text weight="bold" color="#000000">추천</Text>

				<Text color="rgba(0, 0, 0, 0.5)">모임</Text>

				<Text color="rgba(0, 0, 0, 0.5)" 
					onClick={()=>{history.push("/timeline")}}
				>
					타임라인
				</Text>
				<Text color="rgba(0, 0, 0, 0.5)">굿즈</Text>
			</Box>
		</React.Fragment>
	)
}

export default Header;

const Box = styled.div`
	display: flex;
	margin: 13px 20px ;
`;

const Text = styled.div`
	font-size: 20px;
	font-weight: ${(props) => props.weight};
	color: ${(props) => props.color};
	letter-spacing: ${(props) => props.spacing};
	margin-right: 20px;
`;