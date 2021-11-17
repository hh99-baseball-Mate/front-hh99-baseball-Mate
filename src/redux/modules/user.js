import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { getCookie, setCookie } from "../../shared/Cookie";
import axios from "axios";
import { img, instance } from "../../lib/axios"

const BASE_URL = process.env.REACT_APP_BASE_URL

// 액션타입

const LOGIN = "LOGIN"
const LOGIN_CHECK = "LOGIN_CHECK"
const PHONE_AUTH = "PHONE_AUTH"
const IS_AUTH = "IS_AUTH"
const CHOICE_CLUB = "CHOICE_CLUB"

// 액션 함수

const logIn = createAction(LOGIN, (user_info) => ({ user_info }))
const loginCheck = createAction(LOGIN_CHECK, (login_user) => ({ login_user }))
const choiceClub = createAction(CHOICE_CLUB, (myteam) => ({ myteam }))
const phone_auth = createAction(PHONE_AUTH, (phoneNumber) => ({ phoneNumber }))
const is_auth = createAction(IS_AUTH, (auth) => ({ auth }))

const initialState = {
  user_info: [],
  is_login: false,
  is_auth: false,
}

// 미들웨어

const logInMD = (user_info) => {
  return function (dispatch, getState, { history }) {
    const { userid, password } = user_info

    console.log(user_info)
    instance
      .post("/user/login", { userid, password })
      .then((res) => {
        // console.log("로그인반환", res)

        const myteam = res.data.myteam

        const accessToken = res.data.token

        // axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
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
          // console.log("구단선택하세요")
          history.push("/login/clubchoice")
          return
        }

        window.alert("로그인 완료")
        history.push("/")
      })
      .catch((err) => {
        console.log(err, "로그인에러입니다.")
        window.alert("일치하는 회원정보가 없습니다.")
      })
  }
}

const signUpMD = (user_info) => {
  return function (dispatch, getState, { history }) {
    const { userid, username, password, phonenumber } = user_info

    instance
      .post("/user/signup", {
        userid,
        username,
        password,
        phonenumber,
      })
      .then((res) => {
        window.alert("회원가입 성공")
        history.replace("/login")
        console.log(res)
      })
      .catch((err) => {
        window.alert("중복 된 이메일이 있습니다")
        console.log(err, "회원가입 에러")
      })
  }
}

const logInCheckMD = () => {
  return function (dispatch, getState, { history }) {
    instance
      .post("/user/logincheck")
      .then((res) => {
        const myteam = res.data.myteam
        console.log(res)

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
      .catch((err) => console.log(err, "로그인체크에러"))
  }
}

const userUpdateMD = (formdata, id) => {
  return function (dispatch, getState, { history }) {
    // const user_info = getState().user.user_info

    img
      .patch(`/users/${id}`, formdata)
      .then((res) => {
        // console.log(res.data)
        dispatch(logInCheckMD())
        history.replace(`/mypage/${id}`)
      })
      .catch((err) => console.log(err, "유저업데이트 오류"))
  }
}

const choiceClubMD = (club) => {
  return function (dispatch, getState, { history }) {
    axios
      .post(
        // `${BASE_URL}/users/${id}`,
        `${BASE_URL}/user/myteam`,
        { myteam: club },
        {
          headers: {
            "Content-type": "application/json;charset=UTF-8",
            // "Content-Type": "multipart/form-data",
            // accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "X-AUTH-TOKEN": getCookie("is_login"),
          },
        }
      )
      .then((res) => {
        // console.log(res)
        dispatch(choiceClub(club))
        history.replace("/")
      })
      .catch((err) => console.log(err, "클럽선택 err입니다."))
  }
}

// 카카오 로그인
const kakaoLogin = (key) => {
  return function (dispatch, getState, { history }) {
    axios
      //  {REDIRECT_URI}?code={AUTHORIZE_CODE}
      .get(`${BASE_URL}/user/kakao/callback?code=${key}`)
      .then((res) => {
        const access_token = res.data.token

        setCookie("is_login", access_token)

        window.alert("로그인 완료")
        history.push("/")
      })
      .catch((err) => console.log(err, "카카오 로그인 실패"))
  }
}

// 인증번호 보내기

const PhoneAuthSubmitMD = (phoneNumber) => {
  return function (dispatch, getState, { history }) {
    instance
      .post("/checkPhone", { phoneNumber })
      .then((res) => {
        // console.log(res, "번호인증")
      })
      .catch((err) => {
        window.alert("입력하신 번호가 올바르지 않습니다.")
        console.log(err, "핸드폰 번호인증 에러")
      })
  }
}

// 인증번호 인증하기

const PhoneAuthConfirmMD = ({ phoneNumber, phoneAuth }) => {
  return function (dispatch, getState, { history }) {
    // console.log(phoneNumber, phoneAuth)

    const auth = getState().user.is_auth

    instance
      .post("/confirmNumChk", { phoneNumber, ranNum: phoneAuth })
      .then((res) => {
        if (!auth) {
          // 회원가입시 백엔드에 넘겨 줄 번호 저장
          dispatch(phone_auth(phoneNumber))

          // 인증 여부
          dispatch(is_auth(true))

          window.alert("번호인증 완료")
          history.push("/signup")
        }
      })
      .catch((err) => {
        window.alert("인증번호가 일치하지 않습니다.")
        console.log(err, "핸드폰 인증번호 에러")
      })
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
        draft.is_login = true
      }),
    [PHONE_AUTH]: (state, action) =>
      produce(state, (draft) => {
        const phoneNumber = action.payload.phoneNumber
        draft.user_info = { ...draft.user_info, phoneNumber }
      }),
    [IS_AUTH]: (state, action) =>
      produce(state, (draft) => {
        draft.is_auth = action.payload.auth
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
  userUpdateMD,
  choiceClubMD,
  PhoneAuthSubmitMD,
  PhoneAuthConfirmMD,
  // userUpdate,
};

export { actionCreators };
