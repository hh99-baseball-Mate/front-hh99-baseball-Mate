import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";

import home from "../shared/icon/home.svg"
import schedule from "../shared/icon/schedule.svg"
import record from "../shared/icon/record.svg"
import mypage from "../shared/icon/mypage.svg"

const NaviBar = (props) => {

	const history = useHistory();

	return (
		<Container>
			<Warp justify="space-between">
				<Icon onClick={()=>{history.push("/")}} >
					<img src={home} alt="" />
					<Text>Home</Text>
				</Icon>
				<Icon onClick={()=>{history.push("/")}} >
					<img src={schedule} alt="" />
					<Text>Schedule</Text>
				</Icon>
				<Icon onClick={()=>{history.push("/")}} >
					<img src={record} alt="" />
					<Text>Record</Text>
				</Icon>
				<Icon onClick={()=>{history.push("/mypage")}} >
					<img src={mypage} alt="" />
					<Text>My Page</Text>
				</Icon>
			</Warp>
		</Container>
	)
}

export default NaviBar;

const Container = styled.div`
	background: #fff;
  width: 376px;
  height: 94px;
	border-top: 1px solid #E7E7E7;
  padding: 15px 35px 38px 35px;
	position: fixed;
	bottom: 0px;
	left: 50%;
	transform: translateX(-50%);
`;

const Warp = styled.div`
	display: flex;
	width: ${(props) => props.width};
	flex-direction: ${(props) => props.direction};
	flex-wrap: ${(props) => props.wrap};
	justify-content: ${(props) => props.justify};
	align-items: ${(props) => props.align};
	align-content: ${(props) => props.start};
	margin-left: ${(props) => props.marginLeft};
	margin-bottom: ${(props) => props.bottom};
	margin: ${(props) => props.margin};
	padding: ${(props) => props.padding};
	position: ${(props) => props.position};
`;

const Icon = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Box = styled.div`
  width: 335px;
  /* height: 177px; */
  margin: 20px auto;
`;

const Text = styled.div`
  font-size: 12px;
  font-weight: normal;
  color: #C4C4C4;
  letter-spacing: -0.01em;
  margin-top: 3.5px;
`;