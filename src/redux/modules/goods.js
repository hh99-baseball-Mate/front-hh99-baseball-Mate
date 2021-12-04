// 액션 타입

import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import { instance } from "../../lib/axios";
import { is_loaded } from "./user";

// 액션타입 굿즈 게시글
const GET_GOODS = "GET_GOODS";
const DELETE_GOODS = "DELETE_GOODS";

// 액션 타입 굿즈 댓글
const ADD_GOODS_COMMENT = "ADD_GOODS_COMMENT";
const GET_GOODS_COMMENT = "GET_GOODS_COMMENT";
const DELETE_GOODS_COMMENT = "DELETE_GOODS_COMMENT";
const UPDATE_GOODS_COMMENT = "UPDATE_GOODS_COMMENT";

// 액션 타입 좋아요

const ADD_GOODS_LIKE = "ADD_COODS_LIKE";
const DELETE_GOODS_LIKE = "DELETE_GOODS_LIKE";

const LOADING = "LOADING";

// 액션 함수
const getGoods = createAction(GET_GOODS, (goods_list, goods_list_length) => ({
  goods_list,
  goods_list_length,
}));
const addGoodsComment = createAction(
  ADD_GOODS_COMMENT,
  (goodsId, addComment) => ({
    goodsId,
    addComment,
  })
);
const getGoodsComment = createAction(
  GET_GOODS_COMMENT,
  (goodsId, goodsComment) => ({
    goodsId,
    goodsComment,
  })
);
const deleteGoodsComment = createAction(
  DELETE_GOODS_COMMENT,
  (goodsId, commentId) => ({ goodsId, commentId })
);

const updateGoodsComment = createAction(
  UPDATE_GOODS_COMMENT,
  (goodsId, commentId, comment) => ({ goodsId, commentId, comment })
);

const deleteGoods = createAction(DELETE_GOODS, (goodsId) => ({ goodsId }));

const addGoodsLike = createAction(
  ADD_GOODS_LIKE,
  (goodsId, useridx, likeCheck) => ({
    goodsId,
    useridx,
    likeCheck,
  })
);
const deleteGoodsLike = createAction(
  DELETE_GOODS_LIKE,
  (goodsId, useridx, like) => ({
    goodsId,
    useridx,
    like,
  })
);

// const loading = createAction(LOADING, (is_loading) => ({ is_loading }))

const initialState = {
  goods_list: [],
  list_length: 0,
  is_loading: false,
};

// 굿즈 불러오기

const getGoodsMD = ({ start, next }) => {
  return function (dispatch, getState, { history }) {
    instance
      .get("/goods")
      .then((res) => {
        dispatch(is_loaded(true));

        const goods_list_length = res.data.length;

        const goods_list = res.data.slice(start, next);

        dispatch(getGoods(goods_list, goods_list_length));
      })
      .catch((err) => {
        dispatch(is_loaded(false));
        // console.log(err, "굿즈 가져오기 에러"))
      });
    dispatch(is_loaded(false));
  };
};

// 굿즈 추가

const addGoodsMD = (goodInfo) => {
  return function (dispatch, getState, { history }) {
    instance
      .post("/goods", goodInfo)
      .then((res) => {
        history.replace("/goods");
      })
      .catch((err) => {
        // console.log(err, "굿즈 생성 오류")
      });
  };
};

// 굿즈 삭제

const deleteGoodsMD = (goodsId) => {
  return function (dispatch, getState, { history }) {
    instance
      .delete(`/goods/${goodsId}`)
      .then((res) => {
        dispatch(deleteGoods(goodsId));
      })
      .catch((err) => {
        // console.log(err, "굿즈 삭제에러"))
      });
  };
};

// 댓글 추가

const addGoodsCommentMD = (goodsId, getComment) => {
  return function (dispatch, getState, { history }) {
    instance
      .post(`/goods/${goodsId}/comment`, { comment: getComment })
      .then((res) => {
        dispatch(getGoodsCommentMD(goodsId));
      })
      .catch((err) => {
        // console.log(err, "굿즈 댓글 추가 에러"))
      });
  };
};

// 댓글 불러오기

const getGoodsCommentMD = (goodsId) => {
  return function (dispatch, getState, { history }) {
    instance
      .get("/goods")
      .then((res) => {
        const rowData = res.data;

        const idx = rowData.findIndex((e) => e.goodsId === goodsId);

        const goodsCommentList = rowData[idx].goodsCommentList;

        dispatch(getGoodsComment(goodsId, goodsCommentList));
      })
      .catch((err) => {
        // console.log(err, "굿즈 가져오기 에러"))
      });
  };
};

// 댓글삭제

const deleteGoodsCommentMD = (goodsId, commentId) => {
  return function (dispatch, getState, { history }) {
    instance
      .delete(`/goods/${goodsId}/comment/${commentId}`)
      .then((res) => {
        dispatch(deleteGoodsComment(goodsId, commentId));
      })
      .catch((err) => {
        // console.log(err, "굿즈 댓글삭제 에러"))
      });
  };
};

// 댓글 수정
const updateGoodsCommentMD = (goodsId, commentId, comment) => {
  return function (dispatch, getState, { history }) {
    instance
      .put(`/goods/${goodsId}/comment/${commentId}`, { comment: comment })
      .then((res) => {
        dispatch(updateGoodsComment(goodsId, commentId, comment));
      })
      .catch((err) => {
        // console.log(err, "댓글수정 에러입니다."))
      });
  };
};

// 좋아요
const addGoodsLikeMD = (goodsId, useridx, likeCheck) => {
  return function (dispatch, getState, { history }) {
    instance
      .post(`/goods/${goodsId}/like`, {
        isLiked: likeCheck,
        userIdGoods: useridx,
      })
      .then((res) => {
        // 좋아요 중복이 false 이고, 서버에서 +1 (true) 줬을 경우
        if (likeCheck === false && res.data === true) {
          dispatch(addGoodsLike(goodsId, useridx, likeCheck));
          return;
        }
        // 좋아요 중복이 있거나, 서버에서 -1 (false) 줬을 경우
        if (likeCheck || res.data === false) {
          dispatch(deleteGoodsLike(goodsId, useridx, likeCheck));
          return;
        }
      })
      .catch((err) => {
        // console.log(err, "굿즈 좋아요 에러"))
      });
  };
};

export default handleActions(
  {
    // 굿즈 curd 중 r d
    [GET_GOODS]: (state, action) =>
      produce(state, (draft) => {
        draft.goods_list = action.payload.goods_list;
        draft.list_length = action.payload.goods_list_length;
        draft.is_loading = true;
      }),
    [DELETE_GOODS]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.goods_list.findIndex((e) => {
          return e.goodsId === action.payload.goodsId;
        });

        if (idx !== -1) {
          draft.goods_list.splice(idx, 1);
        }
      }),

    // 댓글 curd
    [ADD_GOODS_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.goods_list.findIndex((e) => {
          return e.goodsId === action.payload.goodsId;
        });
        draft.goods_list[idx].goodsCommentList.push(action.payload.addComment);
      }),
    [GET_GOODS_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.goods_list.findIndex((e) => {
          return e.goodsId === action.payload.goodsId;
        });
        draft.goods_list[idx].goodsCommentList = action.payload.goodsComment;
      }),
    [DELETE_GOODS_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        // 굿즈 리스트에서 인덱스 조회
        const goodsIdx = draft.goods_list.findIndex((e) => {
          return e.goodsId === action.payload.goodsId;
        });

        // 굿즈 리스트의 인덱스 안에서의 댓글리스트 인덱스 조회
        const commentIdx = draft.goods_list[
          goodsIdx
        ].goodsCommentList.findIndex((e) => {
          return e.id === action.payload.commentId;
        });

        // 조회 한 인덱스로 인덱스 번째의 굿즈리스트에서 인덱스 번째 댓글을 삭제

        draft.goods_list[goodsIdx].goodsCommentList.splice(commentIdx, 1);
      }),
    [UPDATE_GOODS_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        // 굿즈 리스트에서 goodsId 찾기
        const goodsIdx = draft.goods_list.findIndex((e) => {
          return e.goodsId === action.payload.goodsId;
        });

        // 굿즈 리스트의 인덱스 안에서의 댓글리스트 인덱스 조회
        const commentIdx = draft.goods_list[
          goodsIdx
        ].goodsCommentList.findIndex((e) => {
          return e.id === action.payload.commentId;
        });

        draft.goods_list[goodsIdx].goodsCommentList[commentIdx] = {
          ...draft.goods_list[goodsIdx].goodsCommentList[commentIdx],
          comment: action.payload.comment,
        };
      }),

    // 좋아요
    [ADD_GOODS_LIKE]: (state, action) =>
      produce(state, (draft) => {
        const goodsIdx = draft.goods_list.findIndex((e) => {
          return e.goodsId === action.payload.goodsId;
        });

        draft.goods_list[goodsIdx].goodsLikesList.push({
          userIdGoods: action.payload.useridx,
        });
      }),
    [DELETE_GOODS_LIKE]: (state, action) =>
      produce(state, (draft) => {
        const goodsIdx = draft.goods_list.findIndex((e) => {
          return e.goodsId === action.payload.goodsId;
        });

        const userIdx = draft.goods_list[goodsIdx].goodsLikesList.findIndex(
          (e) => {
            return e.userIdGoods === action.payload.useridx;
          }
        );
        draft.goods_list[goodsIdx].goodsLikesList.splice(userIdx, 1);
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },

  initialState
);

const actionCreators = {
  getGoods,
  getGoodsMD,
  addGoodsMD,
  getGoodsCommentMD,
  getGoodsComment,
  addGoodsCommentMD,
  addGoodsComment,
  deleteGoodsMD,
  deleteGoods,
  deleteGoodsCommentMD,
  deleteGoodsComment,
  updateGoodsCommentMD,
  updateGoodsComment,
  addGoodsLikeMD,
  addGoodsLike,
  deleteGoodsLike,
};

export { actionCreators };
