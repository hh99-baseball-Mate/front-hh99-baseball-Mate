import React, { useState } from "react";
import styled from "styled-components";


const MessageBox = (props) => {


	return (
		<Container>

		<Warp position="relative">	
			<Warp flex="flex">	
				<Circle marginR="13px"/>
				<Text>김태웅</Text>
			</Warp>
			<Talk>
				asddddsdsddasdasdasd
			</Talk>	
		</Warp>		

		</Container>
	)
}

export default MessageBox;


const Container = styled.div`
  margin-bottom: 10px;
	width: 425px;
`;

const Box = styled.div`
  width: 425px;
  height: ${(props) => props.height};
  background: ${(props) => props.background};
  padding: ${(props) => props.padding};
  display: ${(props) => props.flex};
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  position: ${(props) => props.position};
`;

const Warp = styled.div`
	/* width: 100%; */
	display: ${(props) => props.flex};
	flex-direction: ${(props) => props.direction};
	justify-content: ${(props) => props.justify};
	align-items: ${(props) => props.align};
	margin-left: ${(props) => props.marginLeft};
	margin-bottom: ${(props) => props.bottom};
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
	margin-bottom: ${(props) => props.bottom};
`;

const Circle = styled.div`
	width: 45px;
	height: 45px;
	border-radius: 50%;
	background: #FFFFFF;
	border: 1px solid #E7E7E7;
  display: flex;
  justify-content: center;
  align-items: center;
	margin-left: 8px;
	margin-right: ${(props) => props.marginR};
`;

const Talk = styled.div`
	max-width: 222px;
	background: #FFFFFF;
	border-radius: 0px 10px 10px 10px;
	position: absolute;
	left: 60px;
	top: 30px;
	padding: 12px 10px;
`;

const Input = styled.input`
  width: 335px;
  height: 44px;
  border: 1px solid #E7E7E7;
  border-radius: 5px;
  padding: 14px 40px 14px 14px;
  ::placeholder {
    font-size: 14px;
    color: #C4C4C4;
  }
`;

const SendImg = styled.img`
  position: absolute;
  /* left: 8.34%; */
  right: 8px;
  bottom: 50%;
  transform: translateY(50%);
  cursor: pointer;
`;