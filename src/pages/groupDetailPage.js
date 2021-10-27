import React from "react";
import styled from "styled-components";

const groupDetailPage = (props) => {
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
				<Title>
					<p>11월 22일 롯데 응원 가실분! 저랑 응원같이 하러가요~</p>
				</Title>
				<Warp justify="space-between" align="center" >
					<Bar/>
					<Left>3명 남음</Left>
				</Warp>
			</TitleBox>

			{/* 모임 정보 */}
			<Box height="163px" background="rgba(247, 247, 247, 0.5)" position="relative" margin="20px">
				<Warp justify="space-around" align="center" position="absolute" padding="0 16px 0 16px" style={{top:"78%"}}>
					<Text color="#777777" size="12px">21.11.22</Text>
					<Text color="#777777" size="12px">|</Text>
					<Text color="#777777" size="12px">잠실</Text>
					<Text color="#777777" size="12px">|</Text>
					<Text color="#777777" size="12px">최대 10명</Text>
				</Warp>
			</Box>

			{/* 유저정보 */}
			<Box height="80px" background="#fff" flex="flex" align="center" padding="20px">
				<Circle width="48px" height="48px" radius="50px" background="#C4C4C4"/>
				<Warp direction="column" marginLeft="12px">
					<Text size="14px" weight="bold"  margin="1px">김진희</Text>
					<Text size="12px" color="#C4C4C4" margin="1px">서울시 강서구</Text>
				</Warp>
			</Box>

			{/* 모임소개 */}
			<Box height="121px" background="#FFF0EE" padding="20px">
				<Text size="16px" weight="bold" margin="0 0 15px 0 ">모임소개</Text>
				<Text size="14px" color="#333333">11월 22일 롯데 경기 보러가실분 모여랏! 총 10분이랑 함께 했으면 좋겠어요! 티켓 유무 확인시 참가 확정 가능합니다.</Text>
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

export default groupDetailPage;

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
		background-color: #C4C4C4;
`;

const TitleBox = styled.div`
	position: absolute;
	left: 50%;
	top: 345px;
	transform: translateX(-50%);
	width: 335px;
	height: 139px;
	background: #FFFFFF;
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
	border-radius: 10px;
	padding: 18px;
	z-index: 1;
`;

const Warp = styled.div`
	width: 100%;
	display: flex;
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

const Title = styled.div`
	width: 100%;
	margin: 12px 0px;
	p {
		font-style: normal;
		font-weight: bold;
		font-size: 16px;
	}
`;

const Bar = styled.div`
	width: 230px;
	height: 1px;
	background: #FF4B38;
`;

const Left = styled.div`
	font-weight: bold;
	font-size: 12px;
	color: #F25343;
	letter-spacing: -0.03em;
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
	border-radius: ${(props) => props.radius};
	background: ${(props) => props.background};
	margin-right: ${(props) => props.marginRight};
	padding: 23px;
`;

const Flexdiv = styled.div`
	display: flex;
	justify-content: ${(props) => props.justifyContent};
`;

const Username = styled.div`

`;

const Text = styled.div`
	font-size: ${(props) => props.size};
	font-weight: ${(props) => props.weight};
	color: ${(props) => props.color};
	letter-spacing: ${(props) => props.spacing};
	margin: ${(props) => props.margin};
`;