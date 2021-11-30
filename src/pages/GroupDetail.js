import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { groupDetailCreators } from "../redux/modules/groupDetail"
import { alarmCreators } from "../redux/modules/alarm";
import Info from "../componentsGroupDetail/Info"
import Participant from "../componentsGroupDetail/Participant"
import Comment from "../componentsGroupDetail/GroupComment"
import { ArrowBack } from "../components"

import { actionCreators as userActions } from "../redux/modules/user";
import Loader from "../components/Loader"

const GroupDetail = (props) => {
  const dispatch = useDispatch()
  const params = useParams()
  const groupId = params.groupId

  const loadDetail = useSelector((state) => state.groupDetail?.groupPage)
  const mylist = useSelector((state) => state.groupDetail.mylist)

  const [selectPage, setSelectPage] = useState(true)
  const [heart, setHeart] = useState(false)
  const [join, setJoin] = useState(false)

  // 하트(찜) 한것 배열 몇번째인지 찾기
  const myGroupLikesList = mylist?.myGroupLikesList
  const likePost = myGroupLikesList?.indexOf(Number(groupId))

  // 승인요청 신청자 찾기
  const awaitList = useSelector((state) => state.alarm?.awaitList)
  // console.log("awaitList", awaitList)
  const myWait = awaitList.findIndex(list => list.postId == groupId)

  // const is_loaded = useSelector((state) => state.user.is_loaded)

  useEffect(() => {
    // dispatch(userActions.isLoaded(false))
    dispatch(groupDetailCreators.loadGroupPageMW(groupId))
    dispatch(groupDetailCreators.mylistMW())
    dispatch(alarmCreators.awaitChatListMW())

    if (likePost !== -1) {
      return setHeart(true)
    } else {
      setHeart(false)
    }
  }, [groupId, join, likePost, myWait])


  return (
    <React.Fragment>
      {/* {!is_loaded && <Loader type="bars" color="#F25343"/>} */}
      <ArrowBack>상세 페이지</ArrowBack>
      <Container>

        {/* 글 정보 */}
        <Info
          {...loadDetail}
          {...mylist}
          heart={heart}
          setHeart={setHeart}
        />

        {/* 참여자 & 방명록 */}
        <Box height="65px">
          <Warp padding="20px 0 0 0">
            <ParticipantBtn
              onClick={() => setSelectPage(true)}
              selectPage={selectPage}
            >
              참여자
            </ParticipantBtn>

            <CommentBtn
              onClick={() => setSelectPage(false)}
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
              myWait={myWait}
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
}

export default React.memo(GroupDetail);

const Container = styled.div`
  max-width: 425px;
  width: 100%;
  margin: 0 auto;
  position: relative;
`

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
`

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
`

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
`

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
`

const Rectangle = styled.div`
  background: #c4c4c4;
  width: 100%;
  border: 1px solid #e7e7e7;
`
