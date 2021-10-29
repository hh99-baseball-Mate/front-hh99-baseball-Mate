import { createAction, handleActions } from "redux-actions"
import { produce } from "immer"
import { api } from "../../shared/api"
import { getCookie, setCookie } from "../../shared/Cookie"
import axios from "axios"

// 액션타입

const LOG_IN = "LOG_IN"

// 액션 함수

const logIn = createAction(LOG_IN, (user_info) => ({ user_info }))

const initialState = {
  user: [],
  is_login: false,
}

// 미들웨어

const logInMD = (user_info) => {
  return function (dispatch, getState, { history }) {
    const { userid, password } = user_info
    api
      .post("/user/login", { userid, password })
      .then((res) => {
        console.log("로그인반환", res)

        const _myteam = res.data.myteam

        const accessToken = res.data

        setCookie("is_login", `${accessToken}`)

        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
        dispatch(logIn(userid, _myteam))

        if (!_myteam) {
          console.log("구단선택하세요")
          history.push("/clubchoice")
          return
        }

        window.alert("로그인 완료")
        history.replace("/")
      })

      .catch((err) => console.log(err, "로그인에러입니다."))
  }
}

const signUpMD = (user_info) => {
  return function (dispatch, getState, { history }) {
    const { userid, username, password } = user_info

    api
      .post("/user/signup", {
        userid,
        username,
        password,
      })
      .then((res) => {
        window.alert("회원가입 성공")
        history.replace("/login")
      })
      .catch((err) => console.log(err, "회원가입 에러"))
  }
}

const logInCheckMD = () => {
  return function (dispatch, getState, { history }) {
    const token = getCookie("is_login")

    api
      .post("/api/logincheck", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => [console.log("로그인체크 data", res.data)])
      .catch((err) => console.log(err, "로그인체크에러"))
  }
}

// 카카오 로그인
const kakaoLogin = (key) => {
  return function (dispatch, getState, { history }) {
    axios
      //  {REDIRECT_URI}?code={AUTHORIZE_CODE}
      .get(`http://52.78.93.38/user/kakao/callback?code=${key}`)
      .then((res) => {
        const access_token = res.data.token

        setCookie("is_login", access_token)
        history.replace("/")
      })
      .catch((err) => console.log(err, "카카오 로그인 실패"))
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
  logIn,
  logInMD,
  signUpMD,
  kakaoLogin,
  logInCheckMD,
}

export { actionCreators }
