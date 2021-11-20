import React, { useState } from "react"
import styled from "styled-components"
import { Container, Text } from "../components"
import { BsThreeDots } from "react-icons/bs"
import { FcLike } from "react-icons/fc"
import { Comments } from "./Comments"
import { CommentWrite } from "./CommentWrite"
import { UserProfile } from "./UserProfile"
import { Modal } from "../components/Modal"
// import { Comments } from "../components/Comments"

export const Post = (props) => {
  const [showModal, setShowModal] = useState()
  return (
    <>
      {/* Post부분 */}
      <PostContainer>
        <PostHeader>
          {/* 유저 정보 */}
          <UserInfo>
            <UserProfile
              size="32"
              url="https://img1.daumcdn.net/thumb/S272x320/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FQFcXC%2FbtqCFy6Fjlq%2FLKXlrrmaoXVIgFkHXixNr0%2Fimg.jpg"
            />
            <Text bold margin="0 8px">
              유저네임
            </Text>
            <Text size="12px">롯데</Text>
          </UserInfo>
          {/* 아이콘 */}
          <MoreIcons onClick={() => setShowModal(true)} />
        </PostHeader>
        <PostImg />

        <Container>
          {/* 아이콘 */}
          <PostIcons>
            {/* 좋아요 */}
            <PostLike size="20px" />
            <Text size="12px">3개</Text>
          </PostIcons>
          {/* 글쓴이 */}
          <Text margin="5px 0">테스트유저</Text>
          {/* 포스트 내용 */}
          <PostContents>
            내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다내용입니다
          </PostContents>
          {/* 게시물 내용 더 보기 */}
          <P>...더보기</P>

          {/* 해쉬태그 */}
          <Hash>
            <Span>#롯데 # 김원중</Span>
            <Span>#롯데 # 김원중</Span>
            <Span>#롯데 # 김원중</Span>
          </Hash>

          <P>댓글 0개 더보기</P>

          {/* 게시글 시간 */}
          <P>4시간 전</P>
        </Container>
        <Hr />
        <Comments />
        <Comments />
        <Comments />
        <Comments />
        <CommentWrite />
      </PostContainer>

      {showModal ? <Modal center setShowModal={setShowModal}></Modal> : ""}
    </>
  )
}

const PostContainer = styled.div`
  margin: 15px 0;
  border-bottom: 1px solid #cbcbcb;
  :last-child {
    margin-bottom: 63px;
  }
`

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px;
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`

const MoreIcons = styled(BsThreeDots)`
  align-items: center;
  margin: 7.5px 0;
  cursor: pointer;
`

const PostImg = styled.div`
  width: 100%;
  padding-bottom: 375px;
  background-image: url("https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbleNld%2FbtqFbUMDR4j%2FzcEJerluH4U1eOdSWpZPu1%2Fimg.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
`

const PostIcons = styled.div`
  padding: 8px 0;
  display: flex;
  align-items: center;
`

const PostLike = styled(FcLike)`
  margin: 0 5px 0;
`

const PostContents = styled.div`
  /* height: 40px; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
  color: #c4c4c4;
  font-size: 12px;
  /* -webkit-line-clamp: 2; */
`

const P = styled.p`
  font-size: 12px;
  color: #c4c4c4;
  margin: 5px 0;
`
const Hash = styled.div`
  display: flex;
`
const Span = styled.span`
  margin: 5px 2px;
  font-size: 12px;
  color: #c4c4c4;
`
const Hr = styled.div`
  height: 6px;
  background-color: #f8f8f8;
  margin: 10px 0 0;
`
