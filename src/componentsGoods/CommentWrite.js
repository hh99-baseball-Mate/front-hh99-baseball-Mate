import React from "react"
import styled from "styled-components"
import submit from "../shared/icon/submit.png"
import { UserProfile } from "./UserProfile"

export const CommentWrite = () => {
  return (
    <CommentInputContainer>
      <CommentInputBox>
        <UserProfile
          size="32"
          url="https://img1.daumcdn.net/thumb/S272x320/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FQFcXC%2FbtqCFy6Fjlq%2FLKXlrrmaoXVIgFkHXixNr0%2Fimg.jpg"
        />
        <CommentInput placeholder="댓글을 입력해주세요" />
        <CommentWritIcons src={submit} />
      </CommentInputBox>
    </CommentInputContainer>
  )
}

const CommentInputContainer = styled.div`
  height: 95px;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CommentInputBox = styled.div`
  width: 385px;
  border-radius: 100px;
  background-color: #ffffff;
  display: flex;
  padding: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CommentInput = styled.input`
  width: 260px;
  margin: 0 20px;
  padding: 5px;
  border: none;
  ::placeholder {
    font-size: 13px;
  }
  :focus {
    outline: none;
  }
`

const CommentWritIcons = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
  :hover {
  }
`
