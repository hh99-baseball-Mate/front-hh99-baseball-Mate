// 액션 타입

import produce from "immer"
import { createAction, handleActions } from "redux-actions"
import { instance, tokenInstance } from "../../lib/axios"

const GET_GOODS = "GET_GOODS"
const ADD_GOODS = "ADD_GOODS"
// 액션 함수

const getGoods = createAction(GET_GOODS, (goods_list) => ({ goods_list }))

const initialState = {
  goods_list: [],
  goods_addList: [],
}

const getGoodsMD = () => {
  return function (dispatch, getState, { history }) {
    tokenInstance
      .get("/goods")
      .then((res) => {
        console.log(res.data, "굿즈 목록")

        const goods_info = res.data

        dispatch(getGoods(goods_info))
      })
      .catch((err) => console.log(err, "굿즈 가져오기 에러"))
  }
}

const addGoodsMD = (formData) => {
  return function (dispatch, getState, { history }) {
    // console.log(addList)
    tokenInstance
      .post("/goods", { formData })
      .then((res) => {
        // console.log(res.data, "굿즈등록")
        window.alert("굿즈가 등록되었습니다.")
        history.replace("/goods")
      })
      .catch((err) => console.log(err, "굿즈 등록 에러"))
  }
}

export default handleActions(
  {
    [GET_GOODS]: (state, action) =>
      produce(state, (draft) => {
        draft.goods_list = action.payload.goods_list
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
