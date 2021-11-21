import React, { useState } from "react"
import styled from "styled-components"
import { useProfile } from "../customHook/useProfile"
import { UserProfile } from "./UserProfile"

export const Comments = (props) => {
  const [ImgUrl] = useProfile()

  const [commentMore, setCommentMore] = useState(false)
  // console.log(props, "프롭슨")

  const { comment, userName, comment_preview } = props

  // console.log(comment_preview)

  return (
    <CommentList>
      <UserProfile size="32" url={ImgUrl} />
      <CommentBox>
        <CommentInfo>
          <CommentUserName>
            {comment_preview?.userName ? comment_preview?.userName : userName}
          </CommentUserName>
          <P>1분전</P>
        </CommentInfo>

        {commentMore ? (
          <Comment>
            {comment_preview?.comment ? comment_preview?.comment : comment}
          </Comment>
        ) : (
          <MoreComment>
            {comment_preview?.comment ? comment_preview?.comment : comment}
          </MoreComment>
        )}
        <P onClick={() => setCommentMore(!commentMore)}>...더보기</P>
      </CommentBox>
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
  width: 320px;
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
