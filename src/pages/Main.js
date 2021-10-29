import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { mainCreators } from "../redux/modules/mainPage";
import { useHistory } from "react-router-dom";

import NavigationBar from "../shared/NavigationBar";
import MainTimeline from "../componentsMain/MainTimeline";
import HotGroup from "../componentsMain/HotGroup";
import Banner from "../componentsMain/Banner";
import Header from "../componentsMain/Header";

const Main = (props) => {
	const dispatch = useDispatch();
	const history = useHistory
	const mainTimeline = useSelector((state) => state.mainPage.mainTimeline)
	
	useEffect(() => {
		dispatch(mainCreators.loadMainTimelineMW(10))
	}, [])

	
	console.log("mainTimeline",mainTimeline)

	return (
		<Container>

			<p style={{fontSize:"30px"}}>야구 MATE</p>
			<Header />
			<Banner />
			<HotGroup />
			<Rectangle/>


			<Warp flex="flex" justify="space-between">
				<Text size="16px" weight="bold">
					생생 타임라인 💬
				</Text>
				<Text size= "12px" weight= "500px" color="#C4C4C4"
					onClick={()=>{history.push("/timeline")}}
				>
					+ More
				</Text>
			</Warp>
			<div>
			{
				mainTimeline.map((mainTimeline, idx) => {
					return (
						<MainTimeline key={idx} {...mainTimeline}>
						</MainTimeline>
					)
				})
			}
			</div>
			{/* <MainTimeline {...mainTimeline} /> */}
			{/* <NavigationBar /> */}
			
		</Container>
	)
}

export default Main;

const Container = styled.div`
	width: 375px; 
	/* background-size: cover; */
	/* height: auto; */
	margin: auto;
	padding: 0;
`;

const Rectangle = styled.div`
	background: #E7E7E7;
	width: 100%;
	height: 6px;
`;


const Box = styled.div`
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

const TimeLineCard = styled.div`
	/* width: 300px; */
	height: 50px;
	text-align: center;
	background-color: #ffdeeb;
	margin: auto;
	margin-top: 12px;
	border-radius: 10px;
`;