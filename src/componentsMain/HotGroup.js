import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { mainCreators } from "../redux/modules/mainPage";
import colorUsers from "../icon/colorUsers.svg"

const HotGroup = (props) => {

	const dispatch = useDispatch();
	const hotGroup = useSelector((state) => (state.mainPage.hotGroup))
	console.log("hotGroup",hotGroup)

	useEffect(() => {
		dispatch(mainCreators.hotGroupMW());
	}, [])

	return (
		<Container>

			<Warp flex="flex" justify="space-between" align="center" margin="0 0 13px 0">
				<Text size="16px" weight="bold">
					지금 핫한 모임 🔥
				</Text>
				<Text size= "12px" weight= "500px" color="#C4C4C4">
					+ More
				</Text>
			</Warp>

			<Card>
				<Warp margin="0 0 16px 0">
					<Warp flex="flex" margin="0 0 12px 0">
						<Ellipse borderColor="#F25343" background="#F25343" color="#FFFFFF">
							모집중
						</Ellipse>
						<Ellipse borderColor="#498C9A" color="#498C9A" marginLeft="6px">
							D-10
						</Ellipse>
					</Warp>
					<Warp flex="flex">
						<Text size="12px" color="#777777">21.11.22</Text>
						<Slice> &ensp;|&ensp; </Slice> 
						<Text size="12px" color="#777777">롯데</Text>
						<Slice> &ensp;|&ensp; </Slice> 
						<Text size="12px" color="#777777">최대 10명</Text>
					</Warp>
				</Warp>
				<Circle width="48px" height="48px"/>

				<Text size="16px" weight="bold"> 11월 22일 롯데 응원 가실분! 저랑 응원같이 하러가요~</Text>

				<Warp flex="flex" justify="space-between" align="center" margin="10px 0 0 0">
					<Bar/>
					<Warp flex="flex">
						<img src={colorUsers} alt="users"/>
						<Text size="12px" color="#F25343" weight="bold" spacing="-0.03em;">
							&nbsp;3명&nbsp;
						</Text>
						<Text size="12px" color="#F25343" spacing="-0.03em;">
							남음
						</Text>
					</Warp>
				</Warp>
			</Card>
		
		</Container>
	)
}

export default HotGroup;

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

const Card = styled.div`
	width: 335px;
	height: 177px;
	padding: 18px;
	background: #FFFFFF;
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	position: relative;
`;

const Ellipse = styled.div`
	width: 55px;
	height: 24px;
	background: ${(props) => props.background};
	border: 1px solid ${(props) => props.borderColor};
	border-radius: 60px;
	display: flex;
	justify-content: center;
	align-items: center;
	padding-bottom: 1px;
	margin-left: ${(props) => props.marginLeft};
	font-weight: bold;
	font-size: 12px;
	color: ${(props) => props.color};
`;

const Circle = styled.div`
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	border-radius: 50%;
	background: #C4C4C4;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	position: absolute;
	left: 78.51%;
	right: 7.16%;
	top: 12%;
	bottom: 61.02%;
`;

const Bar = styled.div`
	width: 230px;
	height: 1.5px;
	background: #FF4B38;
`;

const Slice = styled.div`
	color: rgba(196, 196, 196, 0.3);
	font-size: 12px;
`;