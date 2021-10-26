import { createAction, handleActions } from "redux-actions"
import { produce } from "immer"
import { api } from "../../shared/api"
import axios from "axios"

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

const log_in_md = (user_info) => {
  return function (dispatch, getState, { history }) {
    const { userid, password } = user_info
    api
      .post("/user", { userid, password })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err, "로그인에러입니다."))
  }
}

const sign_up_md = (user_info) => {
  return function (dispatch, getState, { history }) {
    const { userid, username, password } = user_info
    console.log(userid, username, password)
    api
      .post("/signup", { userid, username, password })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err, "회원가입 에러"))
  }
}

// 카카오 로그인
const kakaoLogin = (key) => {
  return function (dispatch, getState, { history }) {
    axios
      .get(`http://localhost:3000/user/kakao/callback?code=${key}`)
      .then((res) => {
        console.log(res)

        // const ACCESS_TOKEN = res.data.accessToken
      })
      .catch((err) => console.log(err, "카카오 로그인 실패"))
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
  sign_up_md,
  kakaoLogin,
}

export { actionCreators }
