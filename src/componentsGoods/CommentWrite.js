import React, { useMemo, useState } from "react"
import styled from "styled-components"
import submit from "../shared/icon/submit.png"
import { UserProfile } from "./UserProfile"
import { useDispatch, useSelector } from "react-redux"
import { actionCreators as goodsActions } from "../redux/modules/goods"
// import dayjs from "dayjs"
import { useProfile } from "../customHook/useProfile"

export const CommentWrite = (props) => {
  const { picture, username, useridx, goodsId, usertype } = props

  const dispatch = useDispatch()

  // 댓글 작성을 위한 로그인 체크
  const is_login = useSelector((state) => state.user.is_login)

  // 댓글 내용 저장 state
  const [getComment, setGetComment] = useState("")

  // 댓글작성시 보내줄  날짜 세팅
  // const day = dayjs().format("YYYY-MM-DD :HH:mm:ss")

  const onChange = (e) => {
    setGetComment(e.target.value)
  }

  // 유저 프로필
  const userImg = () => {
    if (usertype === "kakao") {
      return picture
    }
    if (usertype === "normal") {
      return process.env.REACT_APP_IMAGES_BASE_URL + picture
    }
    return
  }

  const submitBtn = () => {
    !getComment
      ? window.alert("댓글을 입력해주세요")
      : dispatch(goodsActions.addGoodsCommentMD(goodsId, getComment))
    setGetComment("")
  }

  return (
    <CommentInputContainer>
      <CommentInputBox>
        {/* 로그인 사용자만 댓글 사용 가능 */}
        {is_login ? (
          <>
            <UserProfile size="32" url={userImg ? userImg : ""} />
            <CommentInput
              placeholder="댓글을 입력해주세요"
              onChange={onChange}
              value={getComment || ""}
            />
            <CommentWritIcons src={submit} onClick={submitBtn} />
          </>
        ) : (
          <div>댓글 작성은 로그인 후 이용가능합니다.</div>
        )}
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
