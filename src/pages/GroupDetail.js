import React, { memo, useEffect, useState } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import { groupDetailCreators } from "../redux/modules/groupDetail"
import Info from "../componentsGroupDetail/Info"
import Participant from "../componentsGroupDetail/Participant"
import Comment from "../componentsGroupDetail/GroupComment"

const GroupDetail = memo((props) => {
  const dispatch = useDispatch()
  const params = useParams()
  const groupId = params.groupId
  const [selectPage, setSelectPage] = useState(true)
  const [close, setClose] = useState(false)
  const [heart, setHeart] = useState(false)
  const [join, setJoin] = useState(false)

  const loadDetail = useSelector((state) => state.groupDetail.groupPage)
  const mylist = useSelector((state) => state.groupDetail.mylist)

  // 하트(찜) 한것 배열 몇번째인지 찾기
  const myGroupLikesList = mylist.myGroupLikesList;
  const likePost = myGroupLikesList.indexOf(Number(groupId))

  useEffect(() => {
    const groupId = params.groupId
    dispatch(groupDetailCreators.loadGroupPageMW(groupId))
    dispatch(groupDetailCreators.mylistMW())
  }, [dispatch, likePost, groupId, selectPage, close])



  const commentBtn = () => {
    const myJoin = loadDetail.appliedUserInfo.findIndex(
      (list) => list.UserId === mylist.userid
    )
    // console.log("myJoin",myJoin)
    if (loadDetail.createdUserName === mylist.username) {
      return setSelectPage(false)
    } else if (myJoin >= 0) {
      return setSelectPage(false)
    } else {
      window.alert("모임 참여자만 이용 가능합니다.")
    }
  }

  return (
    <Container>
      {/* 글 정보 */}
      <Info
        {...loadDetail}
        {...mylist}
        close={close}
        setClose={setClose}
        heart={heart}
        setHeart={setHeart}
        likePost={likePost}
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
              commentBtn()
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
            close={close}
            join={join}
            setJoin={setJoin}
          />
        ) : (
          <Comment {...loadDetail} {...mylist} />
        )}
      </Box>
    </Container>
  )
})

export default GroupDetail

const Container = styled.div`
  width: 425px;
  /* background-size: cover; */
  /* height: auto; */
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
