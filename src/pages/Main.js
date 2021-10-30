import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { mainCreators } from "../redux/modules/mainPage";
import { useHistory } from "react-router-dom";

import MainTimeline from "../componentsMain/MainTimeline";
import HotGroup from "../componentsMain/HotGroup";
import Banner from "../componentsMain/Banner";
import Header from "../componentsMain/Header";

const Main = (props) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const mainTimeline = useSelector((state) => state.mainPage.mainTimeline)
	const hotGroup = useSelector((state) => state.mainPage.hotGroup)
	
	useEffect(() => {
		dispatch(mainCreators.hotGroupMW(4))
	}, [])

	useEffect(() => {
		dispatch(mainCreators.loadMainTimelineMW(10))
	}, [])
	
	// console.log("mainTimeline",mainTimeline)
	console.log("hotGroup",hotGroup)

	return (
		<Container>

			<p style={{fontSize:"30px"}}>야구 MATE</p>

			{/* 헤더 네비 */}
			<Header />

			{/* 야구 일정 */}
			<Banner />

			{/* 핫한 모임 타이틀 */}
			<Box>
				<Warp flex="flex" justify="space-between" align="center" margin="0 0 13px 0">
					<Text size="16px" weight="bold">
						지금 핫한 모임 🔥
					</Text>
					
					<Button>
						<Text size= "12px" weight= "500px" color="#C4C4C4"
							onClick={()=>{history.push("/grouplist")}}
						>
							+ More
						</Text>
					</Button>
				</Warp>
			</Box>

			{/* 핫한 모임 리스트 */}
			{
				hotGroup.map((hotGroup, idx) => {
					return (
						<HotGroup key={idx} {...hotGroup} />
					)
				})
			}
			{/* <HotGroup {...hotGroup} /> */}


			{/* 구분선 */}
			<Rectangle/>

			{/* 타임라인 타이틀 */}
			<Box>
				<Warp flex="flex" justify="space-between">
					<Text size="16px" weight="bold">
						생생 타임라인 💬
					</Text>

					<Button>
						<Text size= "12px" weight= "500px" color="#C4C4C4"
							onClick={()=>{history.push("/timeline")}}
						>
							+ More
						</Text>
					</Button>
				</Warp>
			</Box>

			{/* 타임라인 리스트 */}
			{
				mainTimeline.map((mainTimeline, idx) => {
					return (
						<MainTimeline key={idx} {...mainTimeline}>
						</MainTimeline>
					)
				})
			}
			{/* <MainTimeline {...mainTimeline} /> */}
			
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

const Button = styled.button`
	background: none;
	border: none;
`;