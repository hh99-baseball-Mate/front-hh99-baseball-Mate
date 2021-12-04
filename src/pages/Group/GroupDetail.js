import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { groupDetailCreators } from "../../redux/modules/groupDetail"
import { alarmCreators } from "../../redux/modules/alarm"
import {
  RecruitInfo,
  RecruitParticipant,
  RecruitComment,
} from "../../components/recruit/"
import { ArrowBack } from "../../components/common"

export const GroupDetail = (props) => {
  const dispatch = useDispatch()
  const params = useParams()
  const id = params.id

  const loadDetail = useSelector((state) => state.groupDetail?.groupPage)
  const mylist = useSelector((state) => state.groupDetail.mylist)

  const [selectPage, setSelectPage] = useState(true)
  const [heart, setHeart] = useState(false)
  const [join, setJoin] = useState(false)

  // 하트(찜) 한것 배열 몇번째인지 찾기
  const myGroupLikesList = mylist?.myGroupLikesList
  const likePost = myGroupLikesList?.indexOf(Number(id))

  // 승인요청 신청자 찾기
  const awaitList = useSelector((state) => state.alarm?.awaitList)
  // console.log("loadDetail", loadDetail)
  const myWait = awaitList.findIndex((list) => list.postId == id)

  useEffect(() => {
    dispatch(groupDetailCreators.loadGroupPageMW(id))
    dispatch(groupDetailCreators.mylistMW())
    dispatch(alarmCreators.awaitChatListMW())

    if (likePost !== -1) {
      return setHeart(true)
    } else {
      setHeart(false)
    }
  }, [id, join, likePost, myWait])

  return (
    <React.Fragment>
      <ArrowBack>상세 페이지</ArrowBack>
      <Container>
        {/* 글 정보 */}
        <RecruitInfo
          {...loadDetail}
          {...mylist}
          heart={heart}
          setHeart={setHeart}
        />

        {/* 참여자 & 방명록 선택 버튼 */}
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

          {/* 참여자 & 방명록 */}
          {selectPage === true ? (
            <RecruitParticipant
              {...loadDetail}
              {...mylist}
              myWait={myWait}
              join={join}
              setJoin={setJoin}
            />
          ) : (
            <RecruitComment {...loadDetail} {...mylist} />
          )}
        </Box>
      </Container>
    </React.Fragment>
  )
}

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
