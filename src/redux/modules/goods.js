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

const LOADING = "LOADING"

// 액션 함수
const getGoods = createAction(GET_GOODS, (goods_list, goods_list_length) => ({
  goods_list,
  goods_list_length,
}))
const loading = createAction(LOADING, (is_loading) => ({ is_loading }))
const addGoodsComment = createAction(ADD_GOODS_COMMENT, (goodsId, comment) => ({
  goodsId,
  comment,
}))
const getGoodsComment = createAction(GET_GOODS_COMMENT, (comment_list) => ({
  comment_list,
}))
const deleteGoods = createAction(DELETE_GOODS, (goodsId) => ({ goodsId }))

const initialState = {
  goods_list: {
    comment_list: [],
  },
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
// 댓글 조회

const getGoodsCommentMD = (goodsId) => {
  return function (dispatch, geState, { history }) {
    instance
      .get(`/goods/`)
      .then((res) => {
        const comment_list = res.data
        dispatch(getGoodsComment(comment_list))
        console.log(res, "댓글불러오기")
      })
      .catch((err) => console.log(err, "굿즈 댓글 조회 에러"))
  }
}

// 댓글 추가

const addGoodsCommentMD = (goodsId, comment) => {
  return function (dispatch, getState, { history }) {
    console.log(goodsId, comment, "내가 댓글내용")
    instance
      .post(`/goods/${goodsId}/comment`, { comment: comment })
      .then((res) => {
        console.log(res, "댓글추가")
        dispatch(addGoodsComment(goodsId, comment))
      })
      .catch((err) => console.log(err, "굿즈 댓글 추가 에러"))
  }
}

// 댓글

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
        // const idx = draft.comment_list.findIndex((e) => {
        //   console.log(e)
        // })
        draft.goods_list[idx] = {
          ...draft.goods_list[idx],
          commnt_list: {
            comment: action.payload.comment,
          },
        }
      }),
    [GET_GOODS_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.comment_list = action.payload.comment_list
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
}

export { actionCreators }
