import { createAction, handleActions } from "redux-actions"
import { produce } from "immer"
import { api } from "../../shared/api"
import { getCookie, setCookie } from "../../shared/Cookie"
import axios from "axios"

// 액션타입

const LOG_IN = "LOG_IN"
const TIMELINE = "TIMELINE"
// 액션 함수

const log_in = createAction(LOG_IN, (user_info) => ({ user_info }))

const timeLines = createAction(TIMELINE, (contents) => ({ contents }))
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
      .post("/user/login", { userid, password })
      .then((res) => {
        console.log(res.data)

        const accessToken = res.data

        dispatch(log_in(userid, password))

        setCookie("is_login", `${accessToken}`)

        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

        window.alert("로그인 완료")
        history.push("/")
      })

      .catch((err) => console.log(err, "로그인에러입니다."))
  }
}

const sign_up_md = (user_info) => {
  return function (dispatch, getState, { history }) {
    const { userid, username, password } = user_info
    console.log(userid, username, password)
    api
      .post("/user/signup", { userid, username, password })
      .then((res) => {
        console.log(res.data)
        window.alert("회원가입 성공")
        history.push("/login")
      })
      .catch((err) => console.log(err, "회원가입 에러"))
  }
}

// 카카오 로그인
const kakaoLogin = (key) => {
  return function (dispatch, getState, { history }) {
    axios
      //  {REDIRECT_URI}?code={AUTHORIZE_CODE}
      .get(`http://52.78.93.38/user/kakao/callback?code=${key}`)
      .then((res) => {
        console.log(res)

        const access_token = res.data.token
        console.log(access_token)

        setCookie("kakao_login", access_token)
        history.push("/")
      })
      .catch((err) => console.log(err, "카카오 로그인 실패"))
  }
}

const apis = axios.create({
  baseURL: "http://52.78.93.38",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "X-AUTH-TOKEN": getCookie("kakao_login"),
  },
})

const timeLine = (content) => {
  console.log(content)
  return function (dispatch, getState, { history }) {
    // const cookie = getCookie("kakao_login")
    // console.log(cookie)
    apis
      .post("/page/timeLine", {
        data: {
          content,
        },
        headers: {
          "content-type": "application/json;charset=UTF-8",
          accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "X-AUTH-TOKEN": getCookie("kakao_login"),
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err, "타임라인에러"))
  }
}

//  리듀서

export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user_info
        draft.is_login = true
      }),
  },
  initialState
)

const actionCreators = {
  log_in,
  log_in_md,
  sign_up_md,
  kakaoLogin,
  timeLines,
  timeLine,
}

export { actionCreators }
