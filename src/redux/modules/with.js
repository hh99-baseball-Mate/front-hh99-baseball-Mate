import { createAction, handleAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis, img, instance } from "../../lib/axios";

//액션
const GET_PARTICIPATION = "GET_PARTICIPATION"
const GET_WRITE = "GET_WRITE"
// const DELETE_GROUP = "DELETE_GROUP"
// const DELETE_ATTEND = "DELETE_ATTEND"

//스크린 참가
const GET_SCREEN = "GET_SCREEN"
// const DELETE_SCREEN = "DELETE_SCREEN"
const SCREEN_WRITE = "SCREEN_WRITE"

//액션함수
const getParticipation = createAction(
  GET_PARTICIPATION,
  (participation_list) => ({
    participation_list,
  })
)
const getWrite = createAction(GET_WRITE, (write_list) => ({ write_list }))

// const deleteGroup = createAction(DELETE_GROUP, (delete_list) => ({
//   delete_list,
// }))


// const deleteAttend = createAction(DELETE_ATTEND, (attendList) => ({
//   attendList,
// }))

const getScreen = createAction(GET_SCREEN, (screen_list) => ({ screen_list }))
// const deleteScreen = createAction(DELETE_SCREEN, (screenId) => ({ screenId }))

const screenWrite = createAction(SCREEN_WRITE, (scrwrite_list) => ({
  scrwrite_list,
}))

//초기값
const initialState = {
  // 참가모임
  participation_list: [],
  // 작성모임
  write_list: [],
  // 스야모임
  screen_list: [],
  //스야작성
  scrwrite_list: [],
}

//미들웨어
const getParticipationAPI = () => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/my/groups/applications`)
      .then((res) => {
        // console.log(res, "참가모임")
        dispatch(getParticipation(res.data))
      })
      .catch((err) => {
        console.log(err, "참여에러")
      })
  }
}

const getWriteAPI = () => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/my/groups/write`)
      .then((res) => {
        // console.log(res, "작성")
        dispatch(getWrite(res.data))
      })
      .catch((err) => {
        console.log(err, "작성에러")
      })
  }
}

// //delete
// const deleteGroupAPI = (groupId) => {
//   return function (dispatch, getState, { history }) {
//     instance
//       .delete(`/groups/${groupId}`)
//       .then((res) => {
//         // console.log(res)
//         dispatch(deleteGroup(groupId))
//       })
//       .catch((err) => {
//         console.log(err, "삭제에러")
//       })
//   }
// }

// //참여취소
// const deleteAttendAPI = (groupId) => {
//   return function (dispatch, getState, { history }) {
//     instance
//       .delete(`/groups/${groupId}/applications`)
//       .then((res) => {
//         console.log(res)
//         dispatch(deleteAttend(groupId))
//       })
//       .catch((err) => {
//         console.log(err, "참여신청이다")
//       })
//   }
// }

//스크린 참여
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

// const deleteScreenAPI = (screenId) => {
//   return function (dispatch, getState, { history }) {
//     instance
//       .delete(`/screen/${screenId}/applications`)
//       .then((res) => {
//         console.log(res)
//         dispatch(deleteScreen(screenId))
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }
// }

//스크린 작성모임
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
    [GET_PARTICIPATION]: (state, action) =>
      produce(state, (draft) => {
        draft.participation_list = action.payload.participation_list
      }),
    [GET_WRITE]: (state, action) =>
      produce(state, (draft) => {
        draft.write_list = action.payload.write_list
      }),
    // [DELETE_GROUP]: (state, action) =>
    //   produce(state, (draft) => {
    //     let idx = draft.write_list.find(
    //       (c) => c.groupId === action.payload.delete_list
    //     )
    //     // console.log(idx, "qweqweqwe");
    //     draft.write_list.splice(idx, 1)
    //   }),
    // [DELETE_ATTEND]: (state, action) =>
    //   produce(state, (draft) => {
    //     let idx = draft.with_list.find(
    //       (c) => c.groupId === action.payload.attendList
    //     )
    //     draft.with_list.splice(idx, 1)
    //   }),
    [GET_SCREEN]: (state, action) =>
      produce(state, (draft) => {
        draft.screen_list = action.payload.screen_list
      }),
    // [DELETE_SCREEN]: (state, action) =>
    //   produce(state, (draft) => {
    //     let idx = draft.screen_list.find(
    //       (c) => c.screenId === action.payload.screenId
    //     )
    //     draft.screen_list.splice(idx, 1)
    //   }),
    [SCREEN_WRITE]: (state, action) =>
      produce(state, (draft) => {
        draft.scrwrite_list = action.payload.scrwrite_list
      }),
  },
  initialState
)

const actionCreators = {
  getParticipationAPI,
  getWriteAPI,
  getScreenWriteAPI,
  getScreenAPI,
  // deleteGroupAPI,
  // deleteAttendAPI,
  // deleteScreenAPI,
  // deleteScreen,
}

export { actionCreators };
