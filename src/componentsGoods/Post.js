import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Container, Text } from "../components"
import { BsThreeDots } from "react-icons/bs"
import { FcLike } from "react-icons/fc"
import { Comments } from "./Comments"
import { CommentWrite } from "./CommentWrite"
import { UserProfile } from "./UserProfile"
import { Modal } from "../components/Modal"
// import { useProfile } from "../customHook/useProfile"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
// import { Comments } from "../components/Comments"
import { actionCreators as goodsActions } from "../redux/modules/goods"

export const Post = (props) => {
  const dispatch = useDispatch()
  const {
    username,
    picture,
    // myteam,
    // address,
    dayBefore,
    goodsContent,
    goodsImg,
    goodsUserPicture,
    userName,
    goodsName,
    goodsId,
  } = props

  // 유저프로필사진 불러오기 커스텀훅
  // const [ImgUrl] = useProfile()

  // 게시글 이미지
  const postImage = process.env.REACT_APP_IMAGES_BASE_URL + goodsImg
  const userImg = process.env.REACT_APP_IMAGES_BASE_URL + goodsUserPicture
  // 모달
  const [showModal, setShowModal] = useState(false)
  // 게시글 내용 더보기
  const [showContents, setShowContents] = useState(false)
  // 댓글 더보기
  const [showComments, setShowComments] = useState(false)

  const comment_list = useSelector((state) => state.goods.comment_list)

  // const comment_preview = comment_list[0]

  const modalData = {
    title: "굿즈 에디터",
    descriptionOne: "굿즈를 수정/삭제 하시겠습니까?",
    btnClose: "취소",
    btnConfirm: "수정",
    btnUpdate: "삭제",
  }

  const deleteBtn = () => {
    dispatch(goodsActions.deleteGoodsMD(goodsId))
    setShowModal(false)
  }

  console.log(comment_list, "커내트")

  return (
    <>
      {/* Post부분 */}
      <PostContainer>
        <PostHeader>
          {/* 유저 정보 */}
          <UserInfo>
            <UserProfile size="32" url={userImg ? userImg : ""} />
            <Text bold margin="0 8px">
              {userName}
            </Text>
            <Text size="12px">롯데</Text>
            <Text size="12px" margin="0 8px">
              전국
            </Text>
          </UserInfo>
          {/* 아이콘 */}
          <MoreIcons onClick={() => setShowModal(true)} />
        </PostHeader>
        <PostImg url={postImage ? postImage : ""} />

        <Container>
          {/* 아이콘 */}
          <PostIcons>
            {/* 좋아요 */}
            <PostLike size="20px" />
            <Text size="12px">3개</Text>
          </PostIcons>

          {/* 포스트 제목 */}
          <Text margin="8px 0"> {goodsName}</Text>
          {/* 포스트 내용 */}

          {showContents ? (
            <P>{goodsContent}</P>
          ) : (
            <PostContents>{goodsContent}</PostContents>
          )}
          <P onClick={() => setShowContents(!showContents)}>...더보기</P>
          {/* 게시물 내용 더 보기 */}

          {/* 해쉬태그 */}
          <Hash>
            <Span>#롯데 # 김원중</Span>
            <Span>#롯데 # 김원중</Span>
            <Span>#롯데 # 김원중</Span>
          </Hash>

          <P onClick={() => setShowComments(!showComments)}>
            댓글 {comment_list ? comment_list.length : "0"} 더보기
          </P>

          {/* 게시글 시간 */}
          <P>{dayBefore}</P>
        </Container>
        <Hr />

        {showComments
          ? comment_list.map((e) => <Comments key={e.id} {...e}></Comments>)
          : // <Comments comment_preview={comment_preview} />
            ""}

        <CommentWrite
          nickName={username}
          userProfile={picture}
          goodsId={goodsId}
        />
      </PostContainer>

      {showModal && (
        <Modal
          three
          setShowModal={setShowModal}
          modalData={modalData}
          deleteBtn={deleteBtn}
        ></Modal>
      )}
    </>
  )
}

Post.defaultProps = {}

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
  background-image: url(${(props) => props.url});
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
  margin: 5px 0;
  /* -webkit-line-clamp: 2; */
`

const P = styled.p`
  font-size: 12px;
  color: #c4c4c4;
  margin: 5px 0;
  cursor: pointer;
`
const Hash = styled.div`
  display: flex;
`
const Span = styled.span`
  margin: 5px 2px;
  font-size: 12px;
  color: #4f4f8f;
  cursor: pointer;
`
const Hr = styled.div`
  height: 6px;
  background-color: #f8f8f8;
  margin: 10px 0 0;
`
