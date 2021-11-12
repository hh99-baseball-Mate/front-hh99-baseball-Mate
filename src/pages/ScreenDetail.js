import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { screenDetailCreators } from "../redux/modules/screenDetail";
import Info from "../componentsScreenDetail/Info";
import Participant from "../componentsScreenDetail/Participant";
import Comment from "../componentsScreenDetail/Comment";


const ScreenDetail = (props) => {
	const dispatch = useDispatch();
  const params = useParams();
  const groupId = params.groupId
	const [selectPage, setSelectPage] = useState(true)
  const [close, setClose] = useState(false)
  const [heartJoin, setHeartJoin] = useState(false);
  const [join, setJoin] = useState(false);
	
	const loadDetail = useSelector((state) => state.screenDetail.screenPage)
  const mylist = useSelector((state) => state.screenDetail.mylist)
  // const allmylist = useSelector((state) => state.user.user_info)

  console.log("상세페이지", loadDetail)
  console.log("내꺼야", mylist)
  // console.log("내꺼내꺼", allmylist)

  const commentBtn = () => {
    const myJoin = loadDetail.appliedUserInfo.findIndex(list => list.UserId === mylist.userid)
		// console.log("myJoin",myJoin)
    if(loadDetail.createdUserName === mylist.username) {
      return setSelectPage(false)
    } else if(myJoin >= 0) {
      return setSelectPage(false)
		} else {
      window.alert("모임 참여자만 이용 가능합니다.")
    }
  }


  useEffect(()=>{
		dispatch(screenDetailCreators.loadScreenPageMW(groupId))
		dispatch(screenDetailCreators.mylistMW())
	},[selectPage, groupId, heartJoin, join])

	return (
		<Container>

			{/* 글 정보 */}
			<Info {...loadDetail} {...mylist} 
        close={close} setClose={setClose} 
        heartJoin={heartJoin} setHeartJoin={setHeartJoin}
      />

			{/* 참여자 & 방명록 */}
			<Box height="65px">

				<Warp padding="20px 0 0 0">
					<ParticipantBtn {...loadDetail} 
            onClick={() => {setSelectPage(true)}} selectPage={selectPage}
          >
						참여자
					</ParticipantBtn>

					<CommentBtn onClick={() => {commentBtn()}} selectPage={selectPage}>
						방명록
					</CommentBtn>
				</Warp>

				<Rectangle/>

				{
        selectPage === true ? 
          <Participant {...loadDetail} {...mylist} close={close} join={join} setJoin={setJoin} /> 
          : <Comment {...loadDetail} {...mylist} />
        } 

			</Box>


		</Container>
	)
}

export default ScreenDetail;

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
  ${(props) =>
    props.selectPage
      ? ` 
		border-bottom: 3px solid #F25343;
		font-size: 16px;
		color: #F25343; 
		font-weight: bold;`
      : `border: none;`}
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
  ${(props) =>
    !props.selectPage
      ? `
		border-bottom: 3px solid #F25343;
		font-size: 16px;
		color: #F25343; 
		font-weight: bold;`
      : `border: none;`}
`;

const Rectangle = styled.div`
	background: #C4C4C4;
	width: 100%;
	border: 1px solid #E7E7E7;
`;
