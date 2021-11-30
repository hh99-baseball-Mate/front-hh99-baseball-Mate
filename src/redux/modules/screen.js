import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { img, instance } from "../../lib/axios"
import { is_loaded } from "./user";

// const SCREEN_ADD_GROUP = "SCREEN_ADD_GROUP"
const SCREEN_GET_GROUP = "SCREEN_GET_GROUP"
const SCREEN_HOT_GROUP = "SCREEN_HOT_GROUP"
const SCREEN_SORT_GROUP = "SCREEN_SORT_GROUP"
const LOADING = "LOADING" //스크린 참가

const screenGetGroup = createAction(
  SCREEN_GET_GROUP,
  (screen_list, list_length) => ({
    screen_list,
    list_length,
  })
)
const screenHotGroup = createAction(SCREEN_HOT_GROUP, (screen_hot_list) => ({
  screen_hot_list,
}))
const screenDateGroup = createAction(SCREEN_SORT_GROUP, (screen_date_list) => ({
  screen_date_list,
}))

const initialState = {
  // 일반 리스트
  screen_list: [],
  // 인기순
  screen_hot_list: [],
  // 최신순
  screen_date_list: [],

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

          const screenLength = res.data.length

          const infinityView = res.data.slice(start, next)

          dispatch(screenGetGroup(infinityView, screenLength))
        })
        .catch((err) => {
          // console.log(err, "스야 모임 전체 불러오기 오류"))
        })
        dispatch(is_loaded(false))
      return
    }

    // 지역별 불러오기
    instance
      .get(`/screen?region=${encodeURIComponent(regoin)}`)
      .then((res) => {
        const screenLength = res.data.length

        const infinityView = res.data.slice(start, next)

        dispatch(screenGetGroup(infinityView, screenLength))
      })
      .catch((err) => {
        // console.log(err, "스야 지역별 불러오기 오류"))
      })
  }
}

// //  스크린 인기순
// const screenHotGroupMD = () => {
//   return function (dispatch, getState, { history }) {
//     instance
//       .get("/groups/hotscreen")
//       .then((res) => {
//         const screenHotGroupList = res.data
//         dispatch(screenHotGroup(screenHotGroupList))
//       })
//       .catch((err) => {
//         console.log(err, "스크린 인기순 에러"))
//   })
//   }
// }

// // 최신순
// const screenDateGroupMd = (number) => {
//   return function (dispatch, getState, { history }) {
//     instance
//       .get(`/screen?count=5`)
//       .then((res) => {
//         const screenDateGroupList = res.data
//         dispatch(screenDateGroup(screenDateGroupList))
//       })
//       .catch((err) => console.log(err, "스크린 최신순 에러"))
//   }
// }

//리듀서
export default handleActions(
  {
    [SCREEN_GET_GROUP]: (state, action) =>
      produce(state, (draft) => {
        draft.screen_list = action.payload.screen_list
        draft.list_length = action.payload.list_length
        draft.is_loading = true
      }),
    [SCREEN_HOT_GROUP]: (state, action) =>
      produce(state, (draft) => {
        draft.screen_hot_list = action.payload.screen_hot_list
        draft.is_loading = true
      }),
    [SCREEN_SORT_GROUP]: (state, action) =>
      produce(state, (draft) => {
        draft.screen_date_list = action.payload.screen_date_list
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
  // screenHotGroupMD,
  // screenDateGroupMd,
}

export { actionCreators };
