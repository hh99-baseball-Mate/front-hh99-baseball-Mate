import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { instance } from "../../lib/axios"
import { is_loaded } from "./user"

const SCREEN_GET_GROUP = "SCREEN_GET_GROUP"
const LOADING = "LOADING"

const screenGetGroup = createAction(
  SCREEN_GET_GROUP,
  (screen_list, list_length) => ({
    screen_list,
    list_length,
  })
)

const initialState = {
  // 일반 리스트
  screen_list: [],

  // 무한스크롤에 사용// 총 데이터 길이
  list_length: 0,
  is_loading: false,
}

// 스야 모임만들기
const screenAddMD = (screenInfo) => {
  return function (dispatch, getState, { history }) {
    instance
      .post("/screen", screenInfo)
      .then((res) => {
        history.replace("/screen")
      })
      .catch((err) => {
        // console.log(err, "스야 모임생성오류")
      })
  }
}

// 스크린 모임 불러오기
const screenGetMD = (regoin, infinity) => {
  return function (dispatch, getState, { history }) {
    const { start, next } = infinity

    // 전체불러오기
    if (!regoin || regoin === "전국") {
      instance
        .get("/screen")
        .then((res) => {
          dispatch(is_loaded(true))

          // 무한스크롤 마지막 단 체크를 위해 데이터 총 길이를 가져옴 // 마지막 길이까지 스크롤 이벤트
          const screenLength = res.data.length

          // 무한스크롤 보여줄 갯수 next가 2라면 (0, 2~4~6) 0부터 next 값 만큼 증가
          const infinityView = res.data.slice(start, next)

          dispatch(screenGetGroup(infinityView, screenLength))
        })
        .catch((err) => {
          dispatch(is_loaded(false))
          // console.log(err, "스야 모임 전체 불러오기 오류"))
        })
      return
    }

    // 지역별 불러오기
    instance
      .get(`/screen?region=${encodeURIComponent(regoin)}`)
      .then((res) => {
        const screenLength = res.data.length

        // 무한스크롤 마지막 단 체크를 위해 데이터 총 길이를 가져옴 // 마지막 길이까지 스크롤 이벤트
        const infinityView = res.data.slice(start, next)

        // 무한스크롤 보여줄 갯수 next가 2라면 (0, 2~4~6) 0부터 next 값 만큼 증가
        dispatch(screenGetGroup(infinityView, screenLength))
      })
      .catch((err) => {
        // console.log(err, "스야 지역별 불러오기 오류"))
      })
  }
}

//리듀서
export default handleActions(
  {
    [SCREEN_GET_GROUP]: (state, action) =>
      produce(state, (draft) => {
        draft.screen_list = action.payload.screen_list
        draft.list_length = action.payload.list_length
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
  screenAddMD,
  screenGetMD,
  screenGetGroup,
}

export { actionCreators };
