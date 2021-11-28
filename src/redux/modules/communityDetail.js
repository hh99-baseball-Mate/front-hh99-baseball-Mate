import { createAction, handleActions } from "redux-actions";
import { instance } from "../../lib/axios";
import { produce } from "immer";

//액션
//댓글 기능
const POST_COMMUN_COMMENT = "POST_COMMUN_COMMENT";
const UPDATE_COMMUN_COMMENT = "UPDATE_COMMUN_COMMENT";
const DELETE_COMMUN_COMMENT = "DELETE_COMMUN_COMMENT";
const GET_COMMUN_DETAIL = "GET_COMMUN_DETAIL";

//액션함수
const postCommunComment = createAction(
  POST_COMMUN_COMMENT,
  (communityId, comment) => ({
    communityId,
    comment,
  })
);
const updateCommunComment = createAction(
  UPDATE_COMMUN_COMMENT,
  (communityId, commentId, comment) => ({ communityId, commentId, comment })
);
const deleteCommunCommrnt = createAction(
  DELETE_COMMUN_COMMENT,
  (communityId) => ({ communityId })
);
const getCommunDetail = createAction(GET_COMMUN_DETAIL, (detailList) => ({
  detailList,
}));

//초기값
const initialState = {
  detail_list: [],
  comment_list: [],
};

//미들웨어
//댓글등록
const postCommunCommentAPI = (communityId, message) => {
  return function (dispatch, getState, { history }) {
    const comment = { comment: message };
    instance
      .post(`/community/${communityId}/comment`, comment)
      .then((res) => {
<<<<<<< HEAD
        console.log(res);
        dispatch(postCommunComment(communityId, comment));
=======
        // console.log(res)
        dispatch(postCommunComment(communityId))
>>>>>>> master
      })
      .catch((err) => {
        // console.log(err, "커뮤댯글등록")
      })
  }
}

//댓글 수정
const updateCommunCommentAPI = (communityId, commentId, comment) => {
  return function (dispatch, getState, { history }) {
    instance
      .put(`/community/${communityId}/comment/${commentId}`, {
        comment: comment,
      })
      .then((res) => {
        // console.log(res)
        dispatch(updateCommunComment(communityId, commentId, comment))
      })
      .catch((err) => {
        // console.log(err, "커뮤댓글수정")
      })
  }
}

//댓글 삭제
const deleteCommunCommrntAPI = (communityId, commentId) => {
  return function (dispatch, getState, { history }) {
    instance
      .delete(`/community/${communityId}/comment/${commentId}`)
      .then((res) => {
        // console.log(res)
        dispatch(deleteCommunCommrnt(communityId, commentId))
      })
      .catch((err) => {
        // console.log(err, "댓글삭제에러")
      })
  }
}

//디테일 불러오기
const getCommunDetailAPI = (communityId) => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/community/${communityId}`)
      .then((res) => {
        // console.log(res)
        dispatch(getCommunDetail(res.data))
      })
      .catch((err) => {
        // console.log(err, "디테일 페이지 오류")
      })
  }
}

export default handleActions(
  {
    [GET_COMMUN_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.detail_list = action.payload.detailList;
      }),
    [POST_COMMUN_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.detail_list.communityCommentList.push(action.payload.comment);
      }),
    [UPDATE_COMMUN_COMMENT]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

const actionCreators = {
  postCommunCommentAPI,
  updateCommunCommentAPI,
  deleteCommunCommrntAPI,
  getCommunDetailAPI,
};

export { actionCreators };
