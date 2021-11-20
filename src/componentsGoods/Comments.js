import React from "react"
import styled from "styled-components"
import { UserProfile } from "./UserProfile"

export const Comments = (props) => {
  return (
    <CommentList>
      <UserProfile
        size="32"
        url="https://img1.daumcdn.net/thumb/S272x320/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FQFcXC%2FbtqCFy6Fjlq%2FLKXlrrmaoXVIgFkHXixNr0%2Fimg.jpg"
      />
      <CommentBox>
        <CommentInfo>
          <CommentUserName>박서준</CommentUserName>
          <P>1분전</P>
        </CommentInfo>
        <Comment>
          aㅇㅇㄹㅇㄹㅇㄹㅇㄹㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅁㄴㅇㅁㄴㅇㅁㄴㅇ
          ㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴㄴ
        </Comment>
        <P>...더보기</P>
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
  line-height: 1.2;
  /* color: #c4c4c4; */
  font-size: 12px;
  /* -webkit-line-clamp: 2; */
`
