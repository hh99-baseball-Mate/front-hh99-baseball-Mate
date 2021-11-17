// 액션 타입

import axios from "axios"
import produce from "immer"
import { createAction, handleActions } from "redux-actions"
import { img, instance } from "../../lib/axios"
import { getCookie } from "../../shared/Cookie"

const BASE_URL = process.env.REACT_APP_BASE_URL

const GET_GOODS = "GET_GOODS"
const LOADING = "LOADING"
// 액션 함수

const getGoods = createAction(GET_GOODS, (goods_list, goods_list_length) => ({
  goods_list,
  goods_list_length,
}))
const loading = createAction(LOADING, (is_loading) => ({ is_loading }))

const initialState = {
  goods_list: [],
  list_length: 0,
  is_loading: false,
}

const getGoodsMD = (infinity) => {
  return function (dispatch, getState, { history }) {
    const { start, next } = infinity

    dispatch(loading(false))

    instance
      .get("/goods")
      .then((res) => {
        const goods_list_length = res.data.length

        console.log(res)
        const InfinityView = res.data.slice(start, next)

        dispatch(getGoods(InfinityView, goods_list_length))
        dispatch(loading(true))
      })
      .catch((err) => console.log(err, "굿즈 가져오기 에러"))
  }
}

const addGoodsMD = (formData) => {
  return function (dispatch, getState, { history }) {
    // console.log(addList)
    axios
      .post(
        // `${BASE_URL}/users/${id}`,
        `${BASE_URL}/goods`,
        formData,
        {
          headers: {
            // "Content-type": "application/json;charset=UTF-8",
            "Content-Type": "multipart/form-data",
            // accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "X-AUTH-TOKEN": getCookie("is_login"),
          },
        }
      )
      .then((res) => {
        // console.log(res)
        history.replace("/goods")
      })
      .catch((err) => {
        console.log(err, "굿즈 생성 오류")
      })
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
}

export { actionCreators }
