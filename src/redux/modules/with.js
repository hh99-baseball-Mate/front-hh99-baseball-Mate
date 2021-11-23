import { createAction, handleActions } from "redux-actions"
import { produce } from "immer"
import { instance } from "../../lib/axios"

//액션
const GET_GROUP_PARTICIPATION = "GET_GROUP_PARTICIPATION"
const GET_GROUP_WRITE = "GET_GROUP_WRITE"
const GET_GROUP_LIKE = "GET_GROUP_LIKE"

//스크린 참가
const GET_SCREEN_PARTICIPATION = "GET_SCREEN_PARTICIPATION"
const GET_SCREEN_WRITE = "GET_SCREEN_WRITE"
const GET_SCREEN_LIKE = "GET_SCREEN_LIKE"

//액션함수
const getGroupParticipation = createAction(
  GET_GROUP_PARTICIPATION,
  (group_participation_list) => ({
    group_participation_list,
  })
)

const getGroupWrite = createAction(GET_GROUP_WRITE, (group_write_list) => ({
  group_write_list,
}))

const getGroupLike = createAction(GET_GROUP_LIKE, (group_like_list) => ({
  group_like_list,
}))

const getScreen = createAction(
  GET_SCREEN_PARTICIPATION,
  (screen_participation_list) => ({
    screen_participation_list,
  })
)

const screenWrite = createAction(GET_SCREEN_WRITE, (scrwrite_write_list) => ({
  scrwrite_write_list,
}))

const getScreenLike = createAction(GET_SCREEN_LIKE, (likeScreen_list) => ({
  likeScreen_list,
}))

//초기값
const initialState = {
  // 참가모임
  group_participation_list: [],
  // 작성모임
  group_write_list: [],
  // 직관 찜모임
  group_like_list: [],
  // 스야모임
  screen_participation_list: [],
  //스야작성
  scrwrite_write_list: [],
}

//미들웨어

// 직관 참가모임 api
const getParticipationAPI = () => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/my/groups/applications`)
      .then((res) => {
        // console.log(res, "참가모임")
        dispatch(getGroupParticipation(res.data))
      })
      .catch((err) => {
        console.log(err, "참여에러")
      })
  }
}

// 직관 작성모임 api
const getWriteAPI = () => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/my/groups/write`)
      .then((res) => {
        // console.log(res, "작성")
        dispatch(getGroupWrite(res.data))
      })
      .catch((err) => {
        console.log(err, "작성에러")
      })
  }
}

// 직관 찜모임 api
const getLikeAPi = () => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/my/groups/like`)
      .then((res) => {
        console.log(res, "찜모임")
        // dispatch(getParticipation(res.data))
      })
      .catch((err) => {
        console.log(err, "참여에러")
      })
  }
}

//스크린 참여모임 api
const getScreenAPI = () => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`my/screen/applications`)
      .then((res) => {
        console.log(res)
        dispatch(getScreen(res.data))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

//스크린 작성모임 api
const getScreenWriteAPI = (props) => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`my/screen/write`)
      .then((res) => {
        console.log(res)
        dispatch(screenWrite(res.data))
      })
      .catch((err) => console.log(err))
  }
}

//리듀서
export default handleActions(
  {
    [GET_GROUP_PARTICIPATION]: (state, action) =>
      produce(state, (draft) => {
        draft.group_participation_list = action.payload.group_participation_list
      }),
    [GET_GROUP_WRITE]: (state, action) =>
      produce(state, (draft) => {
        draft.group_write_list = action.payload.group_write_list
      }),
    [GET_SCREEN_PARTICIPATION]: (state, action) =>
      produce(state, (draft) => {
        draft.screen_participation_list =
          action.payload.screen_participation_list
      }),

    [GET_SCREEN_WRITE]: (state, action) =>
      produce(state, (draft) => {
        draft.scrwrite_write_list = action.payload.scrwrite_write_list
      }),
  },
  initialState
)

const actionCreators = {
  getParticipationAPI,
  getWriteAPI,
  getScreenWriteAPI,
  getScreenAPI,
  getLikeAPi,
}

export { actionCreators }
