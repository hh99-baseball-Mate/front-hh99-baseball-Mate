import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";
import axios from "axios";
import { img, instance } from "../../lib/axios";


// 액션타입

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const LOGIN_CHECK = "LOGIN_CHECK";
const PHONE_AUTH = "PHONE_AUTH";
const IS_AUTH = "IS_AUTH";
const CHOICE_CLUB = "CHOICE_CLUB";

const IS_LOADED = "IS_LOADED"

// 액션 함수

const logIn = createAction(LOGIN, (user_info) => ({ user_info }));
const logOut = createAction(LOGOUT, (user_info) => ({ user_info }));
const loginCheck = createAction(LOGIN_CHECK, (login_user) => ({ login_user }));
const choiceClub = createAction(CHOICE_CLUB, (myteam) => ({ myteam }));
const phone_auth = createAction(PHONE_AUTH, (phoneNumber, phoneAuth) => ({
  phoneNumber,
  phoneAuth,
}))

const is_auth = createAction(IS_AUTH, (auth) => ({ auth }))

export const is_loaded = createAction(IS_LOADED, (loaded) => ({ loaded }))

const initialState = {
  is_loaded: true,
  user_info: [],
  is_login: false,
  is_auth: false,
  is_sendNuM: false,
}

// 미들웨어

const logInMD = (user_info) => {
  return function (dispatch, getState, { history }) {
    const { userid, password } = user_info

    instance
      .post("/user/login", { userid, password })
      .then((res) => {
        const myteam = res.data.myteam

        const accessToken = res.data.token

        setCookie("is_login", `${accessToken}`)
        const token = getCookie("is_login")

        // 기본 헤더 토큰 재설정
        instance.defaults.headers.common["X-AUTH-TOKEN"] = token
        // 멀티 헤더 토큰 재설정
        img.defaults.headers.common["X-AUTH-TOKEN"] = token

        dispatch(logInCheckMD())

        const userInfo = {
          userid,
          myteam,
        }

        dispatch(logIn(userInfo))

        if (myteam === null) {
          history.push("/login/clubchoice")
          return
        }

        window.alert("로그인 완료")
        history.push("/")
      })
      .catch((err) => {
        window.alert("일치하는 회원정보가 없습니다.")
      })
  }
}

const signUpMD = (user_info) => {
  return function (dispatch, getState, { history }) {
    const { userid, username, password, phonenumber, ranNum } = user_info

    instance
      .post("/user/signup", {
        userid,
        username,
        password,
        phonenumber,
        ranNum,
      })
      .then((res) => {
        window.alert("회원가입 성공")
        history.replace("/login")
      })
      .catch((err) => {
        window.alert("중복 된 이메일이 있습니다")
      })
  }
}

const logInCheckMD = () => {
  return function (dispatch, getState, { history }) {
    instance
      .post("/user/logincheck")
      .then((res) => {
        const myteam = res.data.myteam

        const login_user = { ...res.data }

        const token = getCookie("is_login")
        // 기본 헤더 토큰 재설정
        instance.defaults.headers.common["X-AUTH-TOKEN"] = token
        // 멀티 헤더 토큰 재설정
        img.defaults.headers.common["X-AUTH-TOKEN"] = token
        dispatch(loginCheck(login_user))

        if (myteam === null) {
          history.replace("/login/clubchoice")
          return
        }
      })
      .catch((err) => {
        // console.log(err, "로그인체크에러"))
      })
  }
}

const userUpdateMD = (formdata, id) => {
  return function (dispatch, getState, { history }) {
    // 유저 프로필 업데이트
    img
      .patch(`/users/${id}`, formdata)
      .then((res) => {
        dispatch(logInCheckMD())
        history.replace(`/mypage/${id}`)
      })
      .catch((err) => {
        // console.log(err, "유저업데이트 오류"))
      })
  }
}

const choiceClubMD = (club, historyPage) => {
  return function (dispatch, getState, { history }) {
    instance
      .post("/user/myteam", { myteam: club })
      .then((res) => {
        const myteam = res.data.myteam

        dispatch(choiceClub(myteam))
        window.alert(`${myteam}을 선택하셨습니다.`)

        // 로그인하고 구단선택페이지로 바로 온 이용자는 구단선택 후 메인으로 보내고
        if (historyPage === "REPLACE") {
          history.replace("/")
          return
        }

        // 마이페이지에서 구단변경으로 들어온 이용자는 다시 마이페이지로 보냄
        if (historyPage === "PUSH") {
          history.goBack()
          return
        }
      })
      .catch((err) => {
        // console.log(err, "클럽선택 err입니다."))
      })
  }
}

// 카카오 로그인
const kakaoLogin = (key) => {
  return function (dispatch, getState, { history }) {
    axios
      //  {서버주소/콜백}?code={AUTHORIZE_CODE}
      .get(`http://54.180.148.132:8080/user/kakao/callback?code=${key}`)
      .then((res) => {
        const access_token = res.data.token

        setCookie("is_login", access_token)

        const token = getCookie("is_login")
        // 기본 헤더 토큰 재설정
        instance.defaults.headers.common["X-AUTH-TOKEN"] = token
        // 멀티 헤더 토큰 재설정
        img.defaults.headers.common["X-AUTH-TOKEN"] = token

        window.alert("카카오 로그인 완료")
        history.replace("/")

        dispatch(logInCheckMD())
      })
      .catch((err) => {
        window.alert("로그인이 실패하였습니다. 일반로그인으로 진행해주세요.")
        history.goBack()
        // console.log(err, "카카오 로그인 실패")
      })
  }
}

// 인증번호 보내기

const PhoneAuthSubmitMD = (phoneNumber) => {
  return function (dispatch, getState, { history }) {
    // 회원가입 핸드폰 인증시 폰 번호를 서버에 보냄
    instance
      .post("/checkPhone", { phoneNumber })
      .then((res) => {
        window.alert("인증번호가 전송되었습니다")
      })
      .catch((err) => {
        window.alert("입력하신 번호가 올바르지 않습니다.")
        // console.log(err, "핸드폰 번호인증 에러")
      })
  }
}

// 인증번호 인증하기

const PhoneAuthConfirmMD = ({ phoneNumber, phoneAuth }) => {
  return function (dispatch, getState, { history }) {
    const auth = getState().user.is_auth

    // 인증번호와 폰번호를 서버에 보내서 인증을 함
    instance
      .post("/confirmNumChk", { phoneNumber, ranNum: phoneAuth })
      .then((res) => {
        if (!auth) {
          // 회원가입시 백엔드에 넘겨 줄 번호 저장
          dispatch(phone_auth(phoneNumber, phoneAuth))

          // 인증 여부
          dispatch(is_auth(true))

          window.alert("번호인증 완료되었습니다.")
          history.push("/signup")
        }
      })
      .catch((err) => {
        window.alert("인증번호가 일치하지 않습니다.")
        // console.log(err, "핸드폰 인증번호 에러")
      })
  }
}

const isLoaded = (loaded) => {
  return function (dispatch, getState, { history }) {
    dispatch(is_loaded(loaded))
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
    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login")
        draft.user_info = []
        draft.is_login = false
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
        draft.is_login = true
      }),
    [PHONE_AUTH]: (state, action) =>
      produce(state, (draft) => {
        const phoneNumber = action.payload.phoneNumber
        const ranNum = action.payload.phoneAuth
        draft.user_info = { ...draft.user_info, phoneNumber, ranNum }
      }),
    [IS_AUTH]: (state, action) =>
      produce(state, (draft) => {
        draft.is_auth = action.payload.auth
      }),
    [IS_LOADED]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loaded = action.payload.loaded
      }),
  },
  initialState
)

const actionCreators = {
  logInMD,
  signUpMD,
  kakaoLogin,
  logInCheckMD,
  userUpdateMD,
  choiceClubMD,
  PhoneAuthSubmitMD,
  PhoneAuthConfirmMD,
  isLoaded,
}

export { actionCreators };
