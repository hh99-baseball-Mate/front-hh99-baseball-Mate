import { createAction, handleActions } from "redux-actions"
import { produce } from "immer"
import { img, instance } from "../../lib/axios"

// const SCREEN_ADD_GROUP = "SCREEN_ADD_GROUP"
const SCREEN_GET_GROUP = "SCREEN_GET_GROUP"
const LOADING = "LOADING"

// const screenAddGroup = createAction(SCREEN_ADD_GROUP, (screenAddList) => ({
//   screenAddList,
// }))
const screenGetGroup = createAction(
  SCREEN_GET_GROUP,
  (screen_list, list_length) => ({
    screen_list,
    list_length,
  })
)

const loading = createAction(LOADING, (is_loading) => ({ is_loading }))

const initialState = {
  // 스야모임
  screen_list: [],
  list_length: 0,
  is_loading: false,
}

// 스야 모임만들기
const screenAddMD = (formData) => {
  return function (dispatch, getState, { history }) {
    img
      .post("/screen", formData)
      .then((res) => {
        console.log(res)
        history.replace("/screen")
        dispatch(loading(false))
      })
      .catch((err) => {
        console.log(err, "스야 모임생성오류")
      })
  }
}

// 스크린 모임 불러오기
const screenGetMD = (regoin, infinity) => {
  return function (dispatch, getState, { history }) {
    // console.log("디스패치", regoin, infinity)

    dispatch(loading(false))
    const { start, next } = infinity

    if (!regoin || regoin === "전국") {
      instance
        .get("/screen")
        .then((res) => {
          const screenLength = res.data.length

          const infinityView = res.data.slice(start, next)

          dispatch(loading(true))
          dispatch(screenGetGroup(infinityView, screenLength))
        })
        .catch((err) => console.log(err, "스야 모임 전체 불러오기 오류"))
      console.log("스야 전체모임 불러오기")
      return
    }

    instance
      .get(`/screen?region=${regoin}`)
      .then((res) => {
        const screenLength = res.data.length

        const infinityView = res.data.slice(start, next)
        dispatch(loading(true))
        dispatch(screenGetGroup(infinityView, screenLength))
      })
      .catch((err) => console.log(err, "스야 지역별 불러오기 오류"))
    console.log("스야 지역별 불러오기")
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

export { actionCreators }