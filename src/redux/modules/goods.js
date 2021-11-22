// 액션 타입

import produce from "immer"
import { createAction, handleActions } from "redux-actions"
import { img, instance } from "../../lib/axios"

// 액션타입 굿즈 게시글
const GET_GOODS = "GET_GOODS"
const DELETE_GOODS = "DELETE_GOODS"

// 액션 타입 굿즈 댓글
const ADD_GOODS_COMMENT = "ADD_GOODS_COMMENT"
const GET_GOODS_COMMENT = "GET_GOODS_COMMENT"
const DELETE_GOODS_COMMENT = "DELETE_GOODS_COMMENT"
const UPDATE_GOODS_COMMENT = "UPDATE_GOODS_COMMENT"

// 액션 타입 좋아요

const ADD_COODS_LIKE = "ADD_COODS_LIKE"

const LOADING = "LOADING"

// 액션 함수
const getGoods = createAction(GET_GOODS, (goods_list, goods_list_length) => ({
  goods_list,
  goods_list_length,
}))
const addGoodsComment = createAction(
  ADD_GOODS_COMMENT,
  (goodsId, addComment) => ({
    goodsId,
    addComment,
  })
)
const getGoodsComment = createAction(
  GET_GOODS_COMMENT,
  (goodsId, goodsComment) => ({
    goodsId,
    goodsComment,
  })
)
const deleteGoodsComment = createAction(
  DELETE_GOODS_COMMENT,
  (goodsId, commentId) => ({ goodsId, commentId })
)

const updateGoodsComment = createAction(
  UPDATE_GOODS_COMMENT,
  (goodsId, commentId, comment) => ({ goodsId, commentId, comment })
)

const deleteGoods = createAction(DELETE_GOODS, (goodsId) => ({ goodsId }))

const addGoodsLike = createAction(ADD_COODS_LIKE, (goodsId, useridx, like) => ({
  goodsId,
  useridx,
  like,
}))

const loading = createAction(LOADING, (is_loading) => ({ is_loading }))

const initialState = {
  goods_list: [],
  list_length: 0,
  is_loading: false,
}

// 굿즈 불러오기

const getGoodsMD = ({ start, next }) => {
  return function (dispatch, getState, { history }) {
    instance
      .get("/goods")
      .then((res) => {
        const goods_list_length = res.data.length

        const goods_list = res.data.slice(start, next)

        dispatch(getGoods(goods_list, goods_list_length))
      })
      .catch((err) => console.log(err, "굿즈 가져오기 에러"))
  }
}

// 굿즈 추가

const addGoodsMD = (formData) => {
  return function (dispatch, getState, { history }) {
    img
      .post("/goods", formData)
      .then((res) => {
        history.replace("/goods")
      })
      .catch((err) => {
        console.log(err, "굿즈 생성 오류")
      })
  }
}

// 굿즈 삭제

const deleteGoodsMD = (goodsId) => {
  return function (dispatch, getState, { history }) {
    instance
      .delete(`/goods/${goodsId}`)
      .then((res) => {
        dispatch(deleteGoods(goodsId))
        console.log(res, "삭제")
      })
      .catch((err) => console.log(err, "굿즈 삭제에러"))
  }
}

// 댓글 추가

const addGoodsCommentMD = (goodsId, getComment) => {
  return function (dispatch, getState, { history }) {
    instance
      .post(`/goods/${goodsId}/comment`, { comment: getComment })
      .then((res) => {
        console.log(res, "댓글추가")
        // dispatch(addGoodsComment(goodsId, addComment))
        dispatch(getGoodsCommentMD(goodsId))
      })
      .catch((err) => console.log(err, "굿즈 댓글 추가 에러"))
  }
}

// 댓글 불러오기

const getGoodsCommentMD = (goodsId) => {
  return function (dispatch, getState, { history }) {
    instance
      .get("/goods")
      .then((res) => {
        const rowData = res.data

        const idx = rowData.findIndex((e) => e.goodsId === goodsId)

        const goodsCommentList = rowData[idx].goodsCommentList

        dispatch(getGoodsComment(goodsId, goodsCommentList))
      })
      .catch((err) => console.log(err, "굿즈 가져오기 에러"))
  }
}

// 댓글삭제

const deleteGoodsCommentMD = (goodsId, commentId) => {
  return function (dispatch, getState, { history }) {
    // console.log(goodsId, commentId)
    instance
      .delete(`/goods/${goodsId}/comment/${commentId}`)
      .then((res) => {
        dispatch(deleteGoodsComment(goodsId, commentId))
      })
      .catch((err) => console.log(err, "굿즈 댓글삭제 에러"))
  }
}

// 댓글 수정
const updateGoodsCommentMD = (goodsId, commentId, comment) => {
  return function (dispatch, getState, { history }) {
    console.log(goodsId, commentId)
    instance
      .put(`/goods/${goodsId}/comment/${commentId}`, { comment: comment })
      .then((res) => {
        console.log(res)
        dispatch(updateGoodsComment(goodsId, commentId, comment))
      })
      .catch((err) => console.log(err, "댓글수정 에러입니다."))
  }
}

const addGoodsLikeMD = (goodsId, useridx, like) => {
  return function (dispatch, getState, { history }) {
    console.log(goodsId, useridx, like)
    instance
      .post(`/goods/${goodsId}/like`, { isLiked: like })
      .then((res) => {
        console.log(res)
        dispatch(addGoodsLike(goodsId, useridx, like))
      })
      .catch((err) => console.log(err, "굿즈 좋아요 에러"))
  }
}

export default handleActions(
  {
    [GET_GOODS]: (state, action) =>
      produce(state, (draft) => {
        draft.goods_list = action.payload.goods_list
        draft.list_length = action.payload.goods_list_length
        draft.is_loading = true
      }),
    [DELETE_GOODS]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.goods_list.findIndex((e) => {
          return e.goodsId === action.payload.goodsId
        })

        if (idx !== -1) {
          draft.goods_list.splice(idx, 1)
        }
      }),
    [ADD_GOODS_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.goods_list.findIndex((e) => {
          return e.goodsId === action.payload.goodsId
        })
        draft.goods_list[idx].goodsCommentList.unshift(
          action.payload.addComment
        )
      }),
    [GET_GOODS_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.goods_list.findIndex((e) => {
          return e.goodsId === action.payload.goodsId
        })
        draft.goods_list[idx].goodsCommentList = action.payload.goodsComment
      }),
    [DELETE_GOODS_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        // 굿즈 리스트에서 인덱스 조회
        const goodsIdx = draft.goods_list.findIndex((e) => {
          return e.goodsId === action.payload.goodsId
        })

        // 굿즈 리스트의 인덱스 안에서의 댓글리스트 인덱스 조회
        const commentIdx = draft.goods_list[
          goodsIdx
        ].goodsCommentList.findIndex((e) => {
          return e.id === action.payload.commentId
        })

        // 조회 한 인덱스로 인덱스 번째의 굿즈리스트에서 인덱스 번째 댓글을 삭제

        draft.goods_list[goodsIdx].goodsCommentList.splice(commentIdx, 1)
      }),
    [UPDATE_GOODS_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        // 굿즈 리스트에서 goodsId 찾기
        const goodsIdx = draft.goods_list.findIndex((e) => {
          return e.goodsId === action.payload.goodsId
        })

        // 굿즈 리스트의 인덱스 안에서의 댓글리스트 인덱스 조회
        const commentIdx = draft.goods_list[
          goodsIdx
        ].goodsCommentList.findIndex((e) => {
          return e.id === action.payload.commentId
        })

        draft.goods_list[goodsIdx].goodsCommentList[commentIdx] = {
          ...draft.goods_list[goodsIdx].goodsCommentList[commentIdx],
          comment: action.payload.comment,
        }
      }),
    [ADD_COODS_LIKE]: (state, action) =>
      produce(state, (draft) => {
        const goodsIdx = draft.goods_list.findIndex((e) => {
          return e.goodsId === action.payload.goodsId
        })

        draft.goods_list[goodsIdx].goodsLikesList.push({
          id: action.payload.useridx,
        })
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading
      }),
  },

  initialState
)

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
}

export { actionCreators }
