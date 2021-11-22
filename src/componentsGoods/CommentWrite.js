import React, { useMemo, useState } from "react"
import styled from "styled-components"
import submit from "../shared/icon/submit.png"
import { UserProfile } from "./UserProfile"
import { useDispatch, useSelector } from "react-redux"
import { actionCreators as goodsActions } from "../redux/modules/goods"
// import dayjs from "dayjs"
import { useProfile } from "../customHook/useProfile"

export const CommentWrite = (props) => {
  const { picture, username, useridx, goodsId } = props
  const dispatch = useDispatch()

  const [userImg] = useProfile()

  const is_login = useSelector((state) => state.user.is_login)

  const [getComment, setGetComment] = useState()

  // 댓글작성시 보내줄  날짜 세팅
  // const day = dayjs().format("YYYY-MM-DD :HH:mm:ss")

  const onChange = (e) => {
    setGetComment(e.target.value)
  }

  const submitBtn = () => {
    dispatch(goodsActions.addGoodsCommentMD(goodsId, getComment))
    setGetComment("")
  }

  return (
    <CommentInputContainer>
      <CommentInputBox>
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
