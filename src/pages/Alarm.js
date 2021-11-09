import React from "react";
import styled from "styled-components";

import { ArrowBack } from "../components";
import { MarginBottom, NaviBar } from "../components";


const Alarm = (props) => {
	return (
		<React.Fragment>
			<Container>
				<ArrowBack>알림</ArrowBack>

				{props.is_login ? (
					<p>내 알림</p>
					) : (
						<p>로그인 후 이용해주세요</p>
					)
				}
				
			</Container>
			<MarginBottom/>
			<NaviBar rec/>
		</React.Fragment>
	)
}

export default Alarm;


const Container = styled.div`
	width: 375px; 
	/* height: 177px; */
	margin: auto;
`;

const Box = styled.div`
	width: 100%;
	height: ${(props) => props.height};
	background: ${(props) => props.background};
	padding: ${(props) => props.padding};
	margin: ${(props) => props.margin};
	margin-bottom: ${(props) => props.bottom};
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
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background: #FFFFFF;
	border: 1px solid #E7E7E7;
  display: flex;
  justify-content: center;
  align-items: center;
	margin-left: 8px;
`;

const List = styled.div`
 	height: 62vh;
	overflow: auto;
`;