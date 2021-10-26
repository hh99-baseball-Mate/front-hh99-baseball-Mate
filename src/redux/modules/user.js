import { createAction, handleActions } from "redux-actions"
import { produce } from "immer"
import { api } from "../../shared/api"

// 액션타입

const LOG_IN = "LOG_IN"
const SIGN_UP = "SIGN_UP"

// 액션 함수

const log_in = createAction(LOG_IN, (user_info) => ({ user_info }))
const sign_up = createAction(SIGN_UP, (user_info) => ({ user_info }))

// 초기값

const initialState = {
  user: [],
  is_login: false,
}

// 미들웨어

const log_in_md = ({ user_info }) => {
  return function (dispatch, getState, { history }) {
    api
      .post("", {})
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err, "로그인에러입니다."))
  }
}

//  리듀서

export default handleActions(
  {
    [LOG_IN]: (state, action) => produce(state, (draft) => ({})),
    [SIGN_UP]: (state, action) => produce(state, (draft) => ({})),
  },
  initialState
)

const actionCreators = {
  log_in,
  log_in_md,
  sign_up,
}

export { actionCreators }
