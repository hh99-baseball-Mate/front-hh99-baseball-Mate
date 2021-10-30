import React, { useState } from "react";
import styled from "styled-components";

import Participant from "../componentsGroupDetail/Participant";
import Comment from "../componentsGroupDetail/Comment";

import calendar from "../shared/icon/calendar.svg"
import location from "../shared/icon/location.svg"
import colorUsers from "../shared/icon/colorUsers.svg"
import users from "../shared/icon/users.svg"


const GroupDetail = (props) => {

	const [selectPage, setSelectPage] = useState(true)

	return (
		<Container>
			<Img/>

			{/* 타이틀 */}
			<TitleBox>
				<Warp>
					<Ellipse borderColor="#F25343" background="#F25343" color="#FFFFFF">
						모집중
					</Ellipse>
					<Ellipse borderColor="#498C9A" color="#498C9A" marginLeft="6px">
						D-10
					</Ellipse>
				</Warp>
				<Text size="16px" weight="bold" margin="12px 0">
					11월 22일 롯데 응원 가실분! 저랑 응원같이 하러가요~
				</Text>
				<Warp justify="space-between" align="center" >
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
			</TitleBox>

			{/* 모임 정보 */}
			<Box height="163px" background="rgba(247, 247, 247, 0.5)" position="relative" margin="20px">
				<Warp width="100%" justify="space-around" align="center" position="absolute" padding="0 40px 0 40px" style={{top:"78%"}}>
					<img src={calendar} alt="calendar" />
					<Text color="#777777" size="12px">21.11.22</Text>
					<Slice> &ensp;|&ensp; </Slice> 
					<img src={location} alt="location" />
					<Text color="#777777" size="12px">잠실</Text>
					<Slice> &ensp;|&ensp; </Slice> 
					<img src={users} alt="users" />
					<Text color="#777777" size="12px">최대 10명</Text>
				</Warp>
			</Box>

			{/* 유저정보 */}
			<Box height="80px" background="#fff" flex="flex" align="center" padding="18px">
				<Warp width="55px" height="55px">
					<Circle width="48px" height="48px" radius="50px" background="#C4C4C4"/>
				</Warp>
				<Warp direction="column" marginLeft="12px">
					<Text size="14px" weight="bold"  margin="1px">김진희</Text>
					<Text size="12px" color="#C4C4C4" margin="1px">서울시 강서구</Text>
				</Warp>
			</Box>

			{/* 모임소개 */}
			<Box height="121px" background="#F2FAFC" padding="20px">
				<Text size="16px" weight="bold" margin="0 0 15px 0 ">모임소개</Text>
				<Text size="14px" color="#333333">11월 22일 롯데 경기 보러가실분 모여랏! 총 10분이랑 함께 했으면 좋겠어요! 티켓 유무 확인시 참가 확정 가능합니다.</Text>
			</Box>

			<Rectangle/>

			{/* 참여자 & 방명록 */}
			<Box height="65px">

				<Warp padding="20px 0 0 0">
					<ParticipantBtn onClick={() => {setSelectPage(true)}} selectPage={selectPage}>
						참여자
					</ParticipantBtn>

					<CommentBtn onClick={() => {setSelectPage(false)}} selectPage={selectPage}>
						방명록
					</CommentBtn>
				</Warp>

				<Rectangle2/>

				{selectPage === true ? <Participant/> : <Comment/>} 

			</Box>


		</Container>
	)
}

// "status" : "success",
// "madeUser" : "모임 생성한 유저의 닉네임",
// "title" : "모임 게시글 제목",
// "content" : "모임 게시글 내용",
// "peopleLimit" : "모임 최대 인원",
// "nowApplyNum" : "현재 참여신청한 인원",
// "canApplyNum" : "참여 가능 인원",
// "stadium" : "경기장 이름",
// "groupDate" : "모임 날짜".
// "groupCommentList" : "모임 게시글 내의 댓글 리스트"

export default GroupDetail;

const Container = styled.div`
  width: 375px;
  /* background-size: cover; */
  /* height: auto; */
  margin: 0 auto;
  position: relative;
`;

const Img = styled.div`
  width: 100%;
  height: 375px;
  background-color: #c4c4c4;
`;

const TitleBox = styled.div`
  position: absolute;
  left: 50%;
  top: 345px;
  transform: translateX(-50%);
  width: 335px;
  height: 139px;
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 16px;
  z-index: 1;
`;

const Warp = styled.div`
  display: flex;
  width: ${(props) => props.width};
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  margin-left: ${(props) => props.marginLeft};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  position: ${(props) => props.position};
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

const Text = styled.div`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
  letter-spacing: ${(props) => props.spacing};
  margin: ${(props) => props.margin};
`;

const Bar = styled.div`
  width: 230px;
  height: 1.5px;
  background: #ff4b38;
`;

const Box = styled.div`
  width: 100%;
  height: ${(props) => props.height};
  background: ${(props) => props.background};
  padding: ${(props) => props.padding};
  display: ${(props) => props.flex};
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  position: ${(props) => props.position};
`;

const Circle = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 50%;
  background: #c4c4c4;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const Slice = styled.div`
  color: #d8d8d8;
  font-size: 12px;
`;


const Rectangle = styled.div`
	background: #E7E7E7;
	width: 100%;
	height: 6px;
`;

const ParticipantBtn = styled.button`
	width: 187px;
	height: 45px;
	background: none;
	padding-bottom: 20px;
	border: none;
	font-size: 16px; 
	color: #777777;
	${(props) => props.selectPage ? ` 
		border-bottom: 3px solid #F25343;
		font-size: 16px;
		color: #F25343; 
		font-weight: bold;`
		:
		`border: none;`
	}
`;

const CommentBtn = styled.button`
	width: 187px;
	height: 45px;
	background: none;
	padding-bottom: 20px;
	border: none;
	font-size: 16px; 
	color: #777777;
	/* margin-right: 0; */
	${(props) => !props.selectPage ? `
		border-bottom: 3px solid #F25343;
		font-size: 16px;
		color: #F25343; 
		font-weight: bold;`
		:
		`border: none;`
	}
`;

const Button = styled.button`
	width: 187px;
	height: 45px;
	background: none;
	padding-bottom: 20px;
	border: none;
`;

const Rectangle2 = styled.div`
	background: #C4C4C4;
	width: 100%;
	border: 1px solid #E7E7E7;
`;
