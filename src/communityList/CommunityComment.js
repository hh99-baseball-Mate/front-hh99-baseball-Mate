import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Text } from "../components";
import { Comments } from "../componentsGoods/Comments";
import { UserProfile } from "../componentsGoods/UserProfile";
import { actionCreators as detailCr } from "../redux/modules/communityDetail";
import send from "../shared/icon/send.svg";
import { history } from "../redux/configStore";
const CommunityComment = (props) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  //유저 타입가져오기
  const { usertype, communityUserPicture } = props;

  // 댓글 작성시 유저정보를 기입하기 위해 불러옴
  const user_info = useSelector((state) => state.user.user_info);
  const id = props.communCommentId;
  const commentList = props?.communityCommentList;

  //수정버튼
  const updateCommentDispatch = (commentId, comment) => {
    dispatch(detailCr.updateCommunCommentAPI(id, commentId, comment));
  };

  //삭제버튼
  const deleteCommentBtn = (commentId) => {
    dispatch(detailCr.deleteCommunCommrntAPI(id, commentId));
  };

  //추가멘트
  const addComment = () => {
    if (message !== "") {
      dispatch(detailCr.postCommunCommentAPI(id, message));
      setMessage("");
      return;
    } else {
      window.alert("내용을 입력하세요.");
      return;
    }
  };

  //유저이미지
  const userImg = () => {
    if (usertype === "kakao") {
      return communityUserPicture;
    }
    if (usertype === "normal") {
      return process.env.REACT_APP_IMAGES_BASE_URL + communityUserPicture;
    }
  };

  return (
    <div>
      {/* 댓글 */}
      {commentList &&
        commentList.length > 0 &&
        commentList.map((e, i) => {
          return (
            <Comments
              usertype={usertype}
              deleteCommentBtn={deleteCommentBtn}
              updateCommentDispatch={updateCommentDispatch}
              key={e.communityCommentId}
              useridx={user_info.useridx}
              {...e}
            />
          );
        })}
      <Box
        height="84px"
        position="relative"
        flex="flex"
        align="center"
        background="#ffffff"
      >
        <Wrap>
          <div>
            <UserProfile size="32" url={userImg} />
          </div>
          <TextArea
            placeholder="댓글을 입력해 주세요..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </Wrap>
        <SendImg
          src={send}
          alt="보내기"
          onClick={() => {
            addComment();
          }}
        />
      </Box>
      <Rectangle />
    </div>
  );
};

export default CommunityComment;

const Box = styled.div`
  width: 100%;
  top: ${(props) => props.top};
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

const Wrap = styled.div`
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

const TextArea = styled.input`
  width: 260px;
  margin: 0 20px;
  padding: 5px;
  white-space: normal;
  border: none;
  ::placeholder {
    font-size: 13px;
    color: #c4c4c4;
  }
  :focus {
    outline: none;
  }
`;

const SendImg = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
  :hover {
  }
`;

const Rectangle = styled.div`
  background: #c4c4c4;
  width: 100%;
  border: 1px solid #e7e7e7;
`;
