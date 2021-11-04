import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";

import home from "../shared/icon/home.svg"
import home_col from "../shared/icon/home_col.svg"
import sch from "../shared/icon/sch.svg"
import sch_col from "../shared/icon/sch_col.svg"
import rec from "../shared/icon/rec.svg"
import rec_col from "../shared/icon/rec_col.svg"
import my from "../shared/icon/my.svg"
import my_col from "../shared/icon/my_col.svg"

const NaviBar = (props) => {

	const history = useHistory();

	return (
		<Container>
			<Warp justify="space-between">

				<Icon onClick={()=>{history.push("/")}} >
					{
						props.home ? 
						<img src={home_col} alt="home_col" /> 
						: <img src={home} alt="home" /> 
					}
				</Icon>

				<Icon onClick={()=>{history.push("/")}} >
					{
						props.sch ? 
						<img src={sch_col} alt="sch_col" /> 
						: <img src={sch} alt="sch" />
					}
				</Icon>

				<Icon onClick={()=>{history.push("/")}} >
					{
						props.rec ?
						<img src={rec_col} alt="rec_col" />
						: <img src={rec} alt="rec" />
					}	
				</Icon>

				<Icon onClick={()=>{history.push("/mypage")}} >
					{
						props.my ?
						<img src={my_col} alt="my_col" />
						: <img src={my} alt="my" />
					}
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
  padding: 15px 28px 38px 35px;
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

const Icon = styled.button`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: none;
	border: none;
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