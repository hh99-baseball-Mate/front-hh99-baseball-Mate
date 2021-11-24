import { createAction } from "redux-actions";

//액션
//댓글 기능
const POST_COMMUN_COMMENT = "POST_COMMUN_COMMENT";
const UPDATE_COMMUN_COMMENT = "UPDATE_COMMUN_COMMENT";
const DELETE_COMMUN_COMMENT = "DELETE_COMMUN_COMMENT";

//액션함수
const postCommunComment = createAction(POST_COMMUN_COMMENT, (commentList) => ({
  commentList,
}));
const updateCommunComment = createAction(
  UPDATE_COMMUN_COMMENT,
  (communityId, commentId, comment) => ({})
);
