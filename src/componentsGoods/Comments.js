import React, { useState } from "react"
import styled from "styled-components"
import { useProfile } from "../customHook/useProfile"
import { UserProfile } from "./UserProfile"
import { TiTimes, TiSpanner, TiTick } from "react-icons/ti"
import { useDispatch } from "react-redux"
import { actionCreators as goodsActions } from "../redux/modules/goods"

export const Comments = (props) => {
  const {
    comment,
    userName,
    comment_preview,
    createdAt,
    commentUserIndex,
    useridx,
    goodsId,
    id,
    usertype,
    commentUserPicture,
    deleteCommentBtn,
    updateCommentDispatch,
  } = props

  const dispatch = useDispatch()

  // 미리보기 유저타입 구분하여 프로필 사진 커스텀 훅으로 넣어주기
  const userImage = comment_preview?.commentUserPicture
    ? comment_preview?.commentUserPicture
    : commentUserPicture

  // 미리보기 유저타입 구분하여 프로필 사진 커스텀 훅으로 넣어주기
  const userType = comment_preview?.usertype
    ? comment_preview?.usertype
    : usertype

  const [userImg] = useProfile(userType, userImage)

  // const [commentMore, setCommentMore] = useState(false)

  // 업데이트 인풋창 보이기/숨기기
  const [updateCommentBtn, setUpdateCommentBtn] = useState(false)

  // 업데이트 내용 담는 state
  const [updateComment, setUpdateComment] = useState("")

  // 댓글 삭제 시 보낼 코맨트아이디 정하기 // 미리보기 아이디 또는 그냥 아이디
  const commentId = comment_preview?.id ? comment_preview?.id : id

  // 댓글 삭제

  // 업데이트 인풋창 보이기 버튼
  const updateBtn = () => {
    setUpdateCommentBtn(true)
  }

  // 업데이트 버튼
  const updateSubmitBtn = () => {
    if (!updateComment) {
      window.alert("수정 할 내용을 입력해주세요")
      return
    }
    updateCommentDispatch(commentId, updateComment)
    setUpdateComment("")
    setUpdateCommentBtn(false)
  }

  return (
    // 1개의 댓글만 미리보기 comment_preview
    <CommentList>
      {comment_preview || comment ? (
        <>
          <UserProfile size="32" url={userImg} />
          <CommentBox>
            {/* 1개의 댓글미리보기 */}
            <CommentInfo>
              <CommentUserName>
                {comment_preview?.userName
                  ? comment_preview?.userName
                  : userName}
              </CommentUserName>
              <P>
                {comment_preview?.createdAt
                  ? comment_preview?.createdAt
                  : createdAt}
              </P>
            </CommentInfo>

            {/* 댓글 / 수정 */}
            {updateCommentBtn ? (
              // 수정시
              <UpdateInputBox>
                <CommentInput
                  value={updateComment}
                  onChange={(e) => setUpdateComment(e.target.value)}
                  placeholder={comment}
                />
                <TiTick size="20" onClick={updateSubmitBtn} />
              </UpdateInputBox>
            ) : (
              // 댓글 보이기
              <MoreComment>
                {comment_preview?.comment ? comment_preview?.comment : comment}
              </MoreComment>
            )}

            {/* <P onClick={() => setCommentMore(!commentMore)}>...더보기</P> */}
          </CommentBox>

          {/* 수정 버튼을 눌렀을 때는 삭제/수정 아이콘 숨김 */}
          {!updateCommentBtn && useridx === commentUserIndex ? (
            <IconBox>
              {/* 댓글 수정 버튼 */}
              <IconsUpdate size="22px" onClick={updateBtn} />
              {/* 댓글 삭제버튼 */}
              <IconsDelete
                size="22px"
                onClick={() => {
                  deleteCommentBtn(commentId)
                }}
              />
            </IconBox>
          ) : (
            ""
          )}
        </>
      ) : (
        <NoComment>댓글을작성해주세요</NoComment>
      )}
    </CommentList>
  )
}

const P = styled.p`
  font-size: 12px;
  color: #c4c4c4;
  margin: 5px 0;
`
const CommentList = styled.div`
  max-width: 385px;
  display: flex;
  margin: 20px 20px 20px;
`
const CommentUserName = styled.p`
  font-size: 14px;
  margin-right: 5px;
`
const CommentBox = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`

const CommentInfo = styled.div`
  display: flex;
  align-items: center;
`
const Comment = styled.p`
  max-height: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  /* color: #c4c4c4; */
  font-size: 12px;
  /* -webkit-line-clamp: 2; */
`
const MoreComment = styled.p`
  /* max-height: 40px; */
  font-size: 12px;
`

const NoComment = styled.div`
  margin: 0 auto;
  cursor: pointer;
  font-weight: bold;
  color: #005eb6;
`

const IconBox = styled.div`
  display: flex;
  align-items: center;
`

const IconsDelete = styled(TiTimes)`
  color: #000;
  cursor: pointer;
  :hover {
    color: #f04949;
  }
`

const IconsUpdate = styled(TiSpanner)`
  color: #000;
  cursor: pointer;
  :hover {
    color: #005ad3;
  }
`

const CommentInput = styled.input`
  padding: 5px;
  border: none;
  ::placeholder {
    font-size: 13px;
  }
  :focus {
    outline: none;
  }
`

const UpdateInputBox = styled.div`
  display: flex;
  align-items: center;
`