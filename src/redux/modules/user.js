import { createAction, handleActions } from "redux-actions"
import { produce } from "immer"
import { setCookie } from "../../shared/Cookie"
import axios from "axios"
import { instance, tokenInstance } from "../../lib/axios"
import { history } from "../configStore"

// 액션타입

const LOGIN = "LOGIN"
const LOGIN_CHECK = "LOGIN_CHECK"
const CHOICE_CLUB = "/main/nowGoods/{number}"

// 액션 함수

const logIn = createAction(LOGIN, (user_info) => ({ user_info }))
const loginCheck = createAction(LOGIN_CHECK, (login_user) => ({ login_user }))
const choiceClub = createAction(CHOICE_CLUB, (myteam) => ({ myteam }))

const initialState = {
  user_info: [],
  is_login: false,
}

// 미들웨어

const logInMD = (user_info) => {
  return function (dispatch, getState, { history }) {
    const { userid, password } = user_info

    instance
      .post("/user/login", { userid, password })
      .then((res) => {
        console.log("로그인반환", res)

        const myteam = res.data.myteam

        const accessToken = res.data.token

        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
        setCookie("is_login", `${accessToken}`)

        const userInfo = {
          userid,
          myteam,
        }

        dispatch(logIn(userInfo))

        if (myteam === null) {
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

    instance
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
    tokenInstance
      .post("/user/logincheck")
      .then((res) => {
        const myteam = res.data.myteam

        const login_user = {
          username: res.data.username,
          myteam,
        }

        dispatch(loginCheck(login_user))

        if (myteam === null) {
          history.replace("/clubchoice")
          return
        }
      })
      .catch((err) => console.log(err, "로그인체크에러"))
  }
}

const choiceClubMD = (club) => {
  return function (dispatch, getState, { history }) {
    tokenInstance
      .post("/user/myteam", {
        myteam: club,
      })
      .then((res) => dispatch(choiceClub(res.data.myteam)))
      .catch((err) => console.log(err, "클럽선택 err입니다."))
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
    [LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.user_info = action.payload.user_info
        draft.is_login = true
      }),
    [LOGIN_CHECK]: (state, action) =>
      produce(state, (draft) => {
        draft.user_info = action.payload.login_user
        draft.is_login = true
      }),
    [CHOICE_CLUB]: (state, action) =>
      produce(state, (draft) => {
        const myteam = action.payload.myteam
        draft.user_info = { ...draft.user_info, myteam }
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
  choiceClubMD,
}

export { actionCreators }
