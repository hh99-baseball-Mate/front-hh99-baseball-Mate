import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getCookie } from '../shared/Cookie';
import { groupDetailCreators } from "../redux/modules/groupDetail";

import smail from "../shared/icon/smail.svg"
import unSmail from "../shared/icon/unSmail.svg"
import more from "../shared/icon/more.svg"
import send from "../shared/icon/send.svg"


const GroupComment = memo((props) => {
  const IMAGES_BASE_URL = process.env.REACT_APP_IMAGES_BASE_URL
  const ip = IMAGES_BASE_URL

  // 기본 로그인일 때 프로필 사진
  const profileImg = ip + props.picture

  // kakaocdn (카카오 프사인지 확인)
  const kakaoCheck = props.picture?.split(".")[1]
  const kakaoImg = props.picture

  const dispatch = useDispatch()
  const history = useHistory()
  const cookie = getCookie("is_login")

  const groupCommentList = useSelector(
    (state) => state.groupDetail.groupPage.groupCommentList
  )
  const groupPage = useSelector((state) => state.groupDetail.groupPage)

  // console.log("groupPage야야", groupPage)
  console.log("코멘트컴포넌트", props)

  const id = props.groupId
  //  console.log("페이지아이디",id)
  const [message, setMessage] = useState("")

  const addComment = () => {
    if (!cookie) {
      window.alert("로그인 후 이용해주세요")
      history.push("/login")
      return
    } else if (message !== "") {
      dispatch(groupDetailCreators.addCommentMW(id, message))
      setMessage("")
      return
    } else {
      window.alert("내용을 입력하세요")
      return
    }
  }

  // useEffect(() => {
  //   dispatch(groupDetailCreators.loadGroupPageMW(props.groupId))
  //   dispatch(groupDetailCreators.mylistMW())
  // }, [])

  return (
    <React.Fragment>
      <Box padding="13px 30px" background="#fff">
        <Warp justify="space-between">
          <Text size="14px" color="#777777">
            방명록 {props.groupCommentList.length}
          </Text>

          <Warp>
            {/* <Text marginR="5px" size="14px" weight="500" color="#C4C4C4">
              인기순
            </Text>
            <Text marginR="5px" size="14px" weight="500" color="#C4C4C4">
              최신순
            </Text> */}
          </Warp>
        </Warp>
      </Box>

      <Rectangle />

      <Box
        height="42px"
        background="#F6F6F6"
        flex="flex"
        justify="center"
        align="center"
      >
        <Text color="#C4C4C4" size="14px">
          방명록을 사용할 때는 욕설과 비방 삼가해주시기 바랍니다.
        </Text>
      </Box>

      {/* 댓글작성 */}
      <Box
        height="69px"
        position="relative"
        flex="flex"
        align="center"
        background="#fff"
      >
        <Warp>
          <div>
            <Circle
              marginT="17px"
              url={kakaoCheck === "kakaocdn" ? kakaoImg : profileImg}
            />
          </div>
          <TextArea
            placeholder="&#13;&#10;댓글을 입력해 주세요..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
            }}
          />
        </Warp>
        <SendImg
          src={send}
          alt="send"
          onClick={() => {
            addComment()
          }}
        />
      </Box>

      <Rectangle />

      {/* 댓글 */}
      {props.groupCommentList.map((comment) => {
        return (
          <CommentList
            key={comment.groupCommentId}
            {...comment}
            id={id}
            myGroupCommentLikesList={props.myGroupCommentLikesList}
          />
        )
      })}
    </React.Fragment>
  )
})

// 댓글 컴포넌트
const CommentList = memo((props) => {
  // console.log("댓글 컴포넌트", props)
  const dispatch = useDispatch()

  const mylist = useSelector((state) => state.groupDetail.mylist)

  const user = useSelector((state) => state.user.user_info)
  const Me = user.username
  const likeList = mylist.myGroupCommentLikesList
  const commentId = props.groupCommentId

  // 사진 받아오기
  const IMAGES_BASE_URL = process.env.REACT_APP_IMAGES_BASE_URL
  const ip = IMAGES_BASE_URL

  // 기본 로그인일 때 프로필 사진
  const profileImg = ip + props.commentUserPicture

  // kakaocdn (카카오 프사인지 확인)
  const kakaoCheck = props.commentUserPicture?.split(".")[1]
  const kakaoImg = props.commentUserPicture

  const [edit, setEdit] = useState(false)
  const [modal, setModal] = useState(false)
  const [like, setLike] = useState(false)

  useEffect(() => {
    dispatch(groupDetailCreators.loadGroupPageMW(props.id))
  }, [])

  // 댓글 좋아요 누른거 아이콘 표시하기
  useEffect(() => {
    const likeIdx = likeList.indexOf(commentId)
    // console.log("likeIdx", likeIdx)
    if (likeIdx >= 0) {
      setLike(true)
    }
  }, [likeList])

  const likeBtn = () => {
    setLike(!like)
    // console.log(like)
    dispatch(
      groupDetailCreators.likegroupCommentMW(
        props.id,
        props.groupCommentId,
        like
      )
    )
  }

  return (
    <React.Fragment>
      <Box
        position="relative"
        background="#fff"
        onClick={() => {
          setModal(false)
        }}
      >
        <Warp>
          <div>
            <Circle
              marginT="26px"
              url={kakaoCheck === "kakaocdn" ? kakaoImg : profileImg}
            />
          </div>

          <Box margin="20px 20px 20px 14px">
            <Warp align="center">
              <Text size="14px" weight="bold" marginR="10px">
                {props.commentUsername}
              </Text>
              <Text color="#C4C4C4" size="12px">
                {props.modifiedAt}
              </Text>
            </Warp>

            <Text size="14px" marginT="5px" width>
              {/* 댓글수정 기능 */}
              {edit ? (
                <EditComment {...props} setEdit={setEdit} />
              ) : (
                <p>{props.comment}</p>
              )}
            </Text>

            {/* 좋아요 싫어요 */}
            <Warp marginT="11px">
              <p
                onClick={() => {
                  likeBtn()
                }}
              >
                {
                  like ? `🥰` : `😶`
                  // <Icon src={smail} alt="smail" marginR="7px" />
                  // : <Icon src={unSmail} alt="smail" marginR="7px" />
                }
              </p>
              <Text size="14px" marginL="7px">
                {props.groupcommentlikeCount}
              </Text>
              {/* <Icon src={unSmail} alt="unSmail" marginR="7px" />
							<Text size="12px">0</Text> */}
            </Warp>
          </Box>

          {/* 더보기 버튼 */}
          {Me === props.commentUsername ? (
            <MoreBtn
              src={more}
              alt="more"
              marginT="-34px"
              marginR="22px"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setModal(!modal)
              }}
            >
              <img src={more} alt="more" />
            </MoreBtn>
          ) : null}

          {/* 수정 삭제 모달 */}
          {modal === true ? (
            <Modal {...props} edit={edit} setEdit={setEdit} />
          ) : null}
        </Warp>
      </Box>
      <Rectangle />
    </React.Fragment>
  )
})

// 모달 컴포넌트
const Modal = (props) => {
  const dispatch = useDispatch()

  const delComment = () => {
    if (window.confirm("정말 삭제하시겠습니까?") === true) {
      dispatch(groupDetailCreators.delCommentMW(props.id, props.groupCommentId))
    }
  }
  // edit={edit}
  return (
    <React.Fragment>
      {/* <Box background="#fff"> */}
      <MWarp direction="column" border="1px solid" radius="10px">
        <ModalButton
          onClick={() => {
            props.setEdit(true)
          }}
        >
          수정
        </ModalButton>
        <ModalButton
          onClick={() => {
            delComment()
          }}
        >
          삭제
        </ModalButton>
      </MWarp>
      {/* </Box> */}
    </React.Fragment>
  )
}

// 수정 컴포넌트
const EditComment = (props) => {
  const dispatch = useDispatch()

  const [message, setMessage] = useState(props.comment)
  // console.log(message, props.id, props.groupCommentId,)

  const editComment = () => {
    if (message === "") {
      return window.alert("댓글을 입력해주세요.")
    }
    dispatch(
      groupDetailCreators.editCommentMW(props.id, props.groupCommentId, message)
    )
    props.setEdit(false)
  }

  return (
    <React.Fragment>
      <EditText
        value={message}
        onChange={(e) => {
          setMessage(e.target.value)
        }}
      />
      <button
        onClick={() => {
          editComment()
        }}
      >
        수정완료
      </button>
      <button
        onClick={() => {
          props.setEdit(false)
        }}
      >
        취소
      </button>
    </React.Fragment>
  )
}

const EditText = styled.textarea`
  width: 285px;
  height: 70px;
	/* border: none; */
  padding: 5px 5px 5px 5px;
  /* margin-left: 12px; */
	resize: none;
`;

GroupComment.defaultProps = {
	myGroupCommentLikesList: [],
	commentUserPicture:""
} 

CommentList.defaultProps = {
	commentUserPicture:""
}
export default GroupComment;



const Rectangle = styled.div`
	background: #C4C4C4;
	width: 100%;
	border: 1px solid #E7E7E7;
`;

const Box = styled.div`
	width: 100%;
	height: ${(props) => props.height};
	background: ${(props) => props.background};
	padding: ${(props) => props.padding};
	margin: ${(props) => props.margin};
	display: ${(props) => props.flex};
	flex-direction: ${(props) => props.direction};
	justify-content: ${(props) => props.justify};
	align-items: ${(props) => props.align};
	position: ${(props) => props.position};
	
`;

const Warp = styled.div`
	display: flex;
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	flex-direction: ${(props) => props.direction};
	flex-wrap: ${(props) => props.wrap};
	justify-content: ${(props) => props.justify};
	align-items: ${(props) => props.align};
	align-content: ${(props) => props.start};
	margin-left: ${(props) => props.marginLeft};
	margin-top: ${(props) => props.marginT};
	margin: ${(props) => props.margin};
	padding: ${(props) => props.padding};
	position: ${(props) => props.position};
`;

const Text = styled.p`
	font-size: ${(props) => props.size};
	font-weight: ${(props) => props.weight};
	color: ${(props) => props.color};
	letter-spacing: ${(props) => props.spacing};
	margin: ${(props) => props.margin};
	margin-right: ${(props) => props.marginR};
	margin-left: ${(props) => props.marginL};
	margin-top: ${(props) => props.marginT};
	cursor: ${(props) => props.pointer};
	line-height: ${(props) => props.height};
	word-break: break-all;
	/* text-align: center; */
`;

const TextArea = styled.textarea`
  width: 310px;
  height: 70px;
	border: none;
  padding: 5px 5px 5px 5px;
  margin-left: 12px;
	resize: none;
	:required
  ::placeholder {
    font-weight: 500;
    font-size: 14px;
    color: #C4C4C4;
  }
`;

const SendImg = styled.img`
  position: absolute;
  right: 20px;
  bottom: 0%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const Circle = styled.div`
	width: 29px;
	height: 29px;
	border-radius: 50%;
	background: #C4C4C4;
	border: 1px solid #E7E7E7;
	margin-top: ${(props) => props.marginT};
	margin-left: 20px;
	background-image: url(${(props) => props.url});
  background-size: cover;
`;

const Icon = styled.img`
	margin-top: ${(props) => props.marginT};
	margin-right: ${(props) => props.marginR};
	cursor: pointer;
`;

const MoreBtn = styled.button`
	position: absolute;
	right: 10px;
	top: 10px;
	/* margin: 5px 10px 0 0 ; */
	/* height: 30px; */
	padding : 5px;
	background: none;
	border: none;
	cursor: pointer;
`;


// 모달 컴포넌트 스타일
const ModalButton = styled.button`
	width: 50px;
	height: auto;
	display: block;
	background: #FFF;
	border: none;
	font-size: 13px;
	padding: 5px;
	&:hover {
		background: lightgrey;
	}
`;

const MWarp = styled.div`
	box-shadow: rgba(0, 0, 0, 0.06) 1px 1px 12px 1px;
	height: 50px;
	position: absolute;
	right: 10px; 
	top: 30px
`;