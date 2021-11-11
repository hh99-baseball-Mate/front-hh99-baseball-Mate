import { createAction, handleActions } from "redux-actions"
import { produce } from "immer"
import { apis, img, instance, tokenInstance, tokenApis } from "../../lib/axios"

const SCREEN_ADD_GROUP = "SCREEN_ADD_GROUP"
const SCREEN_GET_GROUP = "SCREEN_GET_GROUP"

const screenAddGroup = createAction(SCREEN_ADD_GROUP, (screenAddList) => ({
  screenAddList,
}))
const screenGetGroup = createAction(SCREEN_GET_GROUP, (screenGetList) => ({
  screenGetList,
}))

const initialState = {
  // 스야모임
  screen_list: [],
}

// 스야 모임만들기
const screenAddMD = (formData) => {
  return function (dispatch, getState, { history }) {
    img
      .post("/screen", formData)
      .then((res) => {
        console.log(res)
        history.replace("/screen")
      })
      .catch((err) => {
        console.log(err, "스야 모임생성오류")
      })
  }
}

const screenGetMD = (regoin) => {
  return function (dispatch, getState, { history }) {
    console.log("디스패치", regoin)

    if (!regoin) {
      instance
        .get("/screen")
        .then((res) => {
          console.log(res)

          const teamInfo = res.data

          dispatch(screenGetGroup(teamInfo))
        })
        .catch((err) => console.log(err, "스야 모임 전체 불러오기 오류"))
      console.log("스야 전체모임 불러오기")
      return
    }

    instance
      .get(`/screen?region=${regoin}`)
      .then((res) => {
        console.log(res)

        const teamInfo = res.data

        dispatch(screenGetGroup(teamInfo))
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
        draft.screen_list = action.payload.screenGetList
      }),
  },
  initialState
)

const actionCreators = {
  screenAddGroup,
  screenAddMD,
  screenGetGroup,
  screenGetMD,
}

export { actionCreators }
