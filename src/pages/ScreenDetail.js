import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { screenDetailCreators } from "../redux/modules/screenDetail";
import Info from "../componentsScreenDetail/Info";
import Participant from "../componentsScreenDetail/Participant";
import Comment from "../componentsScreenDetail/Comment";
import { ArrowBack } from "../components"


const ScreenDetail = memo((props) => {
  const dispatch = useDispatch()
  const params = useParams()
  const screenId = params.screenId

  const loadDetail = useSelector((state) => state.screenDetail.screenPage)
  const mylist = useSelector((state) => state.screenDetail.screenMylist)

  const [selectPage, setSelectPage] = useState(true)
  // const [close, setClose] = useState(loadDetail?.allowtype)
  const [heart, setHeart] = useState(false)
  const [join, setJoin] = useState(false)

  // 하트(찜) 한것 배열 몇번째인지 찾기
  const myScreenLikesList = mylist?.myScreenLikesList
  const likePost = myScreenLikesList?.indexOf(Number(screenId))
  // console.log(likePost)
  useEffect(() => {
    dispatch(screenDetailCreators.loadScreenPageMW(screenId))
    dispatch(screenDetailCreators.mylistMW())

    if (likePost !== -1) {
      return setHeart(true)
    } else {
      setHeart(false)
    }
  }, [screenId, join, likePost])

  // console.log("스크린상세페이지", loadDetail)
  // console.log("슼린내꺼야", mylist)
  // console.log("내꺼내꺼", allmylist)

  // const commentBtn = () => {
  //   const myJoin = loadDetail.appliedUserInfo.findIndex(
  //     (list) => list.UserId === mylist.userid
  //   )
  //   // console.log("myJoin",myJoin)
  //   if (loadDetail.createdUserName === mylist.username) {
  //     return setSelectPage(false)
  //   } else if (myJoin >= 0) {
  //     return setSelectPage(false)
  //   } else {
  //     window.alert("모임 참여자만 이용 가능합니다.")
  //   }
  // }

  return (
    <React.Fragment>
      <ArrowBack>상세 페이지</ArrowBack>
      <Container>
        {/* 글 정보 */}
        <Info
          {...loadDetail}
          {...mylist}
          // close={close}
          // setClose={setClose}
          heart={heart}
          setHeart={setHeart}
          // likePost={likePost}
        />

        {/* 참여자 & 방명록 */}
        <Box height="65px">
          <Warp padding="20px 0 0 0">
            <ParticipantBtn
              {...loadDetail}
              onClick={() => {
                setSelectPage(true)
              }}
              selectPage={selectPage}
            >
              참여자
            </ParticipantBtn>

            <CommentBtn
              onClick={() => {
                setSelectPage(false)
              }}
              selectPage={selectPage}
            >
              방명록
            </CommentBtn>
          </Warp>

          <Rectangle />

          {selectPage === true ? (
            <Participant
              {...loadDetail}
              {...mylist}
              // close={close}
              join={join}
              setJoin={setJoin}
            />
          ) : (
            <Comment {...loadDetail} {...mylist} />
          )}
        </Box>
      </Container>
    </React.Fragment>
  )
})


export default ScreenDetail;

const Container = styled.div`
  max-width: 425px;
  width: 100%;
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
  width: 50%;
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
  width: 50%;
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
