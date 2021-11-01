import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { groupDetailCreators } from "../redux/modules/groupDetail";
import Info from "../componentsGroupDetail/Info";
import Participant from "../componentsGroupDetail/Participant";
import Comment from "../componentsGroupDetail/Comment";


const GroupDetail = (props) => {
	const dispatch = useDispatch();
	const [selectPage, setSelectPage] = useState(true)
	
	const loadDetail = useSelector((state) => state.groupDetail.groupPage)
	// console.log("loadDetail", loadDetail)

	useEffect(()=>{
		dispatch(groupDetailCreators.loadGroupPageMW())
	},[])


	return (
		<Container>

			{/* 글 정보 */}
			<Info info={loadDetail}/>

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

				<Rectangle/>

				{selectPage === true ? <Participant/> : <Comment/>} 

			</Box>


		</Container>
	)
}

export default GroupDetail;

const Container = styled.div`
  width: 375px;
  /* background-size: cover; */
  /* height: auto; */
  margin: 0 auto;
  position: relative;
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

const Rectangle = styled.div`
	background: #C4C4C4;
	width: 100%;
	border: 1px solid #E7E7E7;
`;
