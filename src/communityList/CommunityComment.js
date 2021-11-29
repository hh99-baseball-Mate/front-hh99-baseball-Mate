import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Text } from "../components";
import { Comments } from "../componentsGoods/Comments";
import { actionCreators as detailCr } from "../redux/modules/communityDetail";
import send from "../shared/icon/send.svg";
const CommunityComment = (props) => {
  // const { communCommentId, commentId } = props;
  const dispatch = useDispatch();
  console.log(props, "새끼야");
  const [message, setMessage] = useState("");
  const [updateComment, setUpdateComment] = useState("");
  const user_info = useSelector((state) => state.user.user_info);

  const id = props.communCommentId;
  const commentList = props?.communityCommentList;

  //수정버튼
  const updateCommentDispatch = (commentId, comment) => {
    dispatch(detailCr.updateCommunCommentAPI(id, commentId, comment));
    // console.log(commentId, comment, "실행됐냐도");
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

  //업데이트 버튼

  return (
    <div>
      {/* 댓글 */}
      {commentList &&
        commentList.length > 0 &&
        commentList.map((e, i) => {
          return (
            <Comments
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
            <Circle marginTop="17px"></Circle>
          </div>
          <TextArea
            placeholder="&#13;&#10;댓글을 입력해 주세요..."
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

const Circle = styled.div`
  width: 29px;
  height: 29px;
  border-radius: 50%;
  background: #c4c4c4;
  border: 1px solid #e7e7e7;
  margin-top: ${(props) => props.marginTop};
  margin-left: 20px;
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const TextArea = styled.textarea`
  width: 310px;
  height: 52px;
  border: none;
  padding: 5px;
  resize: none;
  :required ::placeholder {
    font-weight: 500;
    font-size: 14px;
    color: #c4c4c4;
  }
`;

const SendImg = styled.img`
  position: absolute;
  right: 20px;
  bottom: 0%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const Rectangle = styled.div`
  background: #c4c4c4;
  width: 100%;
  border: 1px solid #e7e7e7;
`;
