import React, { useState } from "react";
import styled from "styled-components";


const MessageBox = (props) => {


	return (
		<Container>

			<Warp >	

				<Circle marginR="13px"/>
				<Warp direction="column">	
					<Text>김태웅</Text>

					<Warp align="flex-end" margin="5px 5px 6px 0">
						<Talk>
							지금 참여 가능 한가요?지금 참여 가능 한가요?지금 참여 가능 한가요?지금 참여 가능 한가요?지금 참여 가능 한가요?지금 참여 가능 한가요?지금 참여 가능 한가요?지금 참여 가능 한가요?지금 참여 가능 한가요?지금 참여 가능 한가요? 
						</Talk>	
						<Time position="relative">
							오전 10:34
						</Time>
					</Warp>
				</Warp>
				
			</Warp>		


			{/* 내가 보낸 메세지 */}
			<Warp align="flex-end" direction="row-reverse" marginR="40px" margin="5px 0">
				<MyTalk>
					오전 11:34오전 11:34오전 11:34오전 11:34오전 11:34
				</MyTalk>
				<MyTime margin="0 6px 0 0">
					오전 11:34
				</MyTime>
			</Warp>	

		</Container>
	)
}

export default MessageBox;


const Container = styled.div`
  margin-bottom: 10px;
	width: 425px;
	position: relative;
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
	display: flex;
	flex-direction: ${(props) => props.direction};
	justify-content: ${(props) => props.justify};
	align-items: ${(props) => props.align};
	margin-left: ${(props) => props.marginLeft};
	margin-bottom: ${(props) => props.bottom};
	margin: ${(props) => props.margin};
	margin-left: ${(props) => props.marginL};
	margin-right: ${(props) => props.marginR};
	padding: ${(props) => props.padding};
	position: ${(props) => props.position};
	/* right: -160px; */
`;

const Text = styled.div`
	font-size: ${(props) => props.size};
	font-weight: ${(props) => props.weight};
	color: ${(props) => props.color};
	letter-spacing: ${(props) => props.spacing};
	margin: ${(props) => props.margin};
	margin-bottom: ${(props) => props.bottom};
`;

const Time = styled.div`
	font-size: 11px;
	font-weight: ${(props) => props.weight};
	color: #777777;
	letter-spacing: ${(props) => props.spacing};
	margin: ${(props) => props.margin};
	margin-bottom: ${(props) => props.bottom};
	/* right: 10px;
	top: 30px; */
	/* padding: 12px 10px; */
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
	margin-left: ${(props) => props.marginL};
	margin-right: ${(props) => props.marginR};
`;

const Talk = styled.div`
	max-width: 275px;
	min-width: 10px;
	background: #FFFFFF;
	border-radius: 0px 10px 10px 10px;
	padding: 12px 10px;
	/* position: absolute;
	left: 60px;
	top: 30px; */
	
	/* word-break: pre-line; */
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

/* 내가 보낸 메세지 */
const MyTalk = styled.div`
	max-width: 320px;
	min-width: 10px;
	background: #F25343;
	color: #FFFFFF;
	border-radius: 10px 0px 10px 10px;
	padding: 12px 10px;
	/* transform: matrix(-1, 0, 0, 1, 0, 0); */
	/* position: absolute;
	right: 0px;
	top: 30px; */
	/* word-break: pre-line; */
`;

const MyTime = styled.div`
	font-size: 11px;
	font-weight: ${(props) => props.weight};
	color: #777777;
	letter-spacing: ${(props) => props.spacing};
	margin: ${(props) => props.margin};
	margin-bottom: ${(props) => props.bottom};
	/* position: absolute; */
	/* right: 10px;
	top: 30px; */
	/* padding: 12px 10px; */
`;