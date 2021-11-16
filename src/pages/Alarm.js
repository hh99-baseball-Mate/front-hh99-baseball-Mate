import React, {useRef} from "react";
import styled from "styled-components";
import SockJsClient from 'react-stomp';

import { ArrowBack } from "../components";
import { MarginBottom, NaviBar } from "../components";


const Alarm = (props) => {

	const websoket = useRef(null);

	return (
		<React.Fragment>
			<Container>
				<ArrowBack bg="true">알림</ArrowBack>

				<Rectangle marginT="35px"/>

				<Alert>
					<div >
						<Circle/>
					</div>
					<Warp margin="0 21px">
						<Text size="14px" weight="500" bottom="3px">
							🔔 참여신청이 왔어요 🔔
						</Text>
						<Text size="12px" height="17px">
							oo님이 회원님 모임방 참여신청을 했어요. 지금 바로 확인하세요!
						</Text>
					</Warp>
					<Text size="10px" color="#777777">11/10</Text>
				</Alert>
				<Rectangle/>

				{/* {props.is_login ? (
					<p>내 알림</p>
					) : (
						<p>로그인 후 이용해주세요</p>
					)
				} */}
				
			</Container>
			<MarginBottom/>
			<NaviBar rec/>
		</React.Fragment>
	)
}

export default Alarm;


const Container = styled.div`
	width: 425px; 
	/* height: 177px; */
	/* margin: auto; */
`;

const Alert = styled.div`
	width: 100%;
	height: 72px;
	padding: 8px 18px 8px 20px;
	display: flex;
	justify-content: center;
	align-items: center;
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
	line-height: ${(props) => props.height};
	color: ${(props) => props.color};
	letter-spacing: ${(props) => props.spacing};
	margin: ${(props) => props.margin};
	margin-bottom: ${(props) => props.bottom};
`;

const Circle = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background: #C4C4C4;
	/* border: 1px solid #E7E7E7; */
  display: flex;
  justify-content: center;
  align-items: center;
	/* margin-left: 8px; */
`;

const List = styled.div`
 	height: 62vh;
	overflow: auto;
`;

const Rectangle = styled.div`
	background: #C4C4C4;
	width: 100%;
	border: 1px solid #E7E7E7;
	margin-top: ${(props) => props.marginT};
`;