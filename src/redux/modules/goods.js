// 액션 타입

import produce from "immer"
import { createAction, handleActions } from "redux-actions"
import { instance, tokenInstance } from "../../lib/axios"

const GET_GOODS = "GET_GOODS"
const ADD_GOODS = "ADD_GOODS"
// 액션 함수

const getGoods = createAction(GET_GOODS, (goods_list) => ({ goods_list }))
const addGoods = createAction(ADD_GOODS, (add_list) => ({ add_list }))

const initialState = {
  goods_list: [],
  goods_addList: [],
}

const getGoodsMD = () => {
  return function (dispatch, getState, { history }) {
    instance
      .get("/main/nowGoods/2")
      .then((res) => {
        // console.log(res.data)
        // dispatch(getGoods(res.data))
      })
      .catch((err) => console.log(err, "굿즈 가져오기 에러"))
  }
}

const addGoodsMD = (addList) => {
  return function (dispatch, getState, { history }) {
    // console.log(addList)
    tokenInstance
      .post("/page/goods", {})
      .then((res) => {
        dispatch(addGoods(addList))
        // console.log(res.data)
      })
      .catch((err) => console.log(err, "굿즈 등록 에러"))
  }
}

export default handleActions(
  {
    [GET_GOODS]: (state, action) => produce(state, (draft) => ({})),
  },
  {
    [ADD_GOODS]: (state, action) => produce(state, (draft) => ({})),
  },
  initialState
)

const actionCreators = {
  getGoods,
  getGoodsMD,
  addGoods,
  addGoodsMD,
}

export { actionCreators }
