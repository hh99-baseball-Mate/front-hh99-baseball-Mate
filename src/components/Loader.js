import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

const Loader = ({type, color,}) => {

	return (
		<Container>

			<Box>
				<ReactLoading type={type} color={color} />
				<Text>로딩중</Text>
			</Box>

		</Container>
	)
}

export default Loader;

const Container = styled.div`
	width: 100%;
	height: 100vh;
	top:0;
	left:0;
	position: fixed;
	background-color: rgba(0,0,0,0.3);
	z-index: 99;
`;

const Box = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: fixed;
	top:50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const Text = styled.div`
	color: #f8f9fa;
	font-weight: bold;
`;