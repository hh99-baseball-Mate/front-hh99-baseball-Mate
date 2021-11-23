import React, { memo, useCallback, useState } from "react"
import styled from "styled-components"
import { Container, Text } from "../components"
import { BsThreeDots } from "react-icons/bs"
import { FcLike, FcLikePlaceholder } from "react-icons/fc"
import { Comments } from "./Comments"
import { CommentWrite } from "./CommentWrite"
import { UserProfile } from "./UserProfile"
import { Modal } from "../components/Modal"
import { useDispatch } from "react-redux"
import { actionCreators as goodsActions } from "../redux/modules/goods"

export const Post = memo((props) => {
  const dispatch = useDispatch()
  const {
    // 유저 info
    user_info: { useridx },

    // 굿즈 info
    // commentUserIndex,
    goodsId,
    userAddress,
    myTeam,
    userName,
    filePath,
    goodsUserPicture,
    goodsName,
    goodsContent,
    goodsCommentList,
    dayBefore,
    goodsLikesList,
    userId,
    usertype,
  } = props

  // 게시글 이미지

  // const like_list = useSelector((state) => state.goods.goods_list)

  // const likeCnt = like_list.map()

  const postImage = process.env.REACT_APP_IMAGES_BASE_URL + filePath

  const userImg = () => {
    if (usertype === "kakao") {
      return goodsUserPicture
    }
    if (usertype === "normal") {
      return process.env.REACT_APP_IMAGES_BASE_URL + goodsUserPicture
    }
  }

  // 모달 보여주기/숨기기
  const [showModal, setShowModal] = useState(false)

  // 게시글 내용 더보기
  const [showContents, setShowContents] = useState(false)

  // 댓글 더보기
  const [showComments, setShowComments] = useState(false)

  // 좋아요
  const [like, setLike] = useState(false)

  // 댓글 1개 미리보기
  const comment_preview = goodsCommentList[0]

  // 삭제/수정 모달내용
  const modalData = {
    title: "굿즈 에디터",
    descriptionOne: "선택하신 굿즈를 삭제 하시겠습니까?",
    descriptionTwo: "삭제되면 다시 복원할 수 없습니다.",
    btnClose: "취소",
    btnUpdate: "삭제",
  }

  const moreBtn = () => {
    setShowComments(!showComments)
  }

  const deleteBtn = () => {
    dispatch(goodsActions.deleteGoodsMD(goodsId))
    setShowModal(false)
  }

  // 좋아요 중복 검사
  const likeCheck = goodsLikesList.map((e) => {
    // console.log(userId, e.id)
    return userId === e.id
  })

  console.log(likeCheck, "중복검사")

  const memoLike = useCallback(() => {
    setLike(!like)
    dispatch(goodsActions.addGoodsLikeMD(goodsId, useridx, like, likeCheck))
    console.log("메모")
  }, [like])

  return (
    <>
      {/* Post부분 */}
      <PostContainer>
        <PostHeader>
          {/* 유저 정보 */}
          <UserInfo>
            <UserProfile size="32" url={userImg} />
            <Text bold margin="0 8px">
              {userName ? userName : "이름없음"}
            </Text>
            <Text size="12px">{myTeam ? myTeam : "구단없음"}</Text>
            <Text size="12px" margin="0 8px">
              {userAddress ? userAddress : "전국"}
            </Text>
          </UserInfo>

          {/* 수정/삭제 모달 아이콘 */}
          {useridx === userId ? (
            <MoreIcons onClick={() => setShowModal(true)} />
          ) : (
            ""
          )}
        </PostHeader>
        <PostImg url={postImage ? postImage : ""} />

        <Container>
          {/* 좋아요 */}
          <PostIcons>
            <LikeBtn onClick={memoLike}>
              {like ? <PostLike size="20px" /> : <PostNoLike size="20px" />}
            </LikeBtn>
            <Text size="12px">{goodsLikesList.length}</Text>
          </PostIcons>

          {/* 굿즈 제목 */}
          <Text margin="8px 0"> {goodsName}</Text>

          {/* 굿즈 내용 */}
          {showContents ? (
            <P>{goodsContent}</P>
          ) : (
            <PostContents>{goodsContent}</PostContents>
          )}
          <P onClick={() => setShowContents(!showContents)}>...더보기</P>
          {/* 게시물 내용 더 보기 */}

          {/* 해쉬태그 */}

          {/* <Hash>
            <Span>#롯데 # 김원중</Span>
            <Span>#롯데 # 김원중</Span>
            <Span>#롯데 # 김원중</Span>
          </Hash> */}

          {/* 댓글 전체 보기 */}
          <P onClick={moreBtn}>
            댓글 {goodsCommentList ? goodsCommentList.length : "0"} 더보기
          </P>

          {/* 게시글 시간 */}
          <P>{dayBefore}</P>
        </Container>
        <Hr />

        {showComments ? (
          goodsCommentList.map((e) => (
            <Comments
              key={e.id}
              {...e}
              useridx={useridx}
              goodsId={goodsId}
            ></Comments>
          ))
        ) : (
          <Comments
            comment_preview={comment_preview}
            useridx={useridx}
            goodsId={goodsId}
          />
        )}

        <CommentWrite {...props.user_info} goodsId={goodsId} />
      </PostContainer>

      {showModal && (
        <Modal
          center
          setShowModal={setShowModal}
          modalData={modalData}
          deleteBtn={deleteBtn}
        ></Modal>
      )}
    </>
  )
})

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
  /* cursor: pointer; */
`
const LikeBtn = styled.div``

const PostLike = styled(FcLike)`
  margin: 0 5px 0;
  cursor: pointer;
`
const PostNoLike = styled(FcLikePlaceholder)`
  margin: 0 5px 0;
  cursor: pointer;
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
