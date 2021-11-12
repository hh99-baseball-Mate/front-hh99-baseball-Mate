import { createAction, handleAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis, img, instance, tokenInstance } from "../../lib/axios";
import { AiOutlineConsoleSql } from "react-icons/ai";

//액션
const GET_WITH = "GET_WITH";
const GET_WRITE = "GET_WRITE";
const DELETE_GROUP = "DELETE_GROUP";

//액션함수
const getWith = createAction(GET_WITH, (withList) => ({ withList }));
const getWrite = createAction(GET_WRITE, (writeList) => ({ writeList }));
const deleteGroup = createAction(DELETE_GROUP, (deleteList) => ({
  deleteList,
}));

//초기값
const initialState = {
  // 삭제와 함께
  with_list: [],
  write_list: [],
};

//미들웨어
const getWithAPI = () => {
  return function (dispatch, getState, { history }) {
    tokenInstance
      .get(`/my/groups/applications`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        dispatch(getWith(res.data));
      })
      .catch((err) => {
        console.log(err, "참여에러");
      });
  };
};

const getWriteAPI = () => {
  return function (dispatch, getState, { history }) {
    tokenInstance
      .get(`/my/groups/write`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        dispatch(getWrite(res.data));
      })
      .catch((err) => {
        console.log(err, "작성에러");
      });
  };
};

//delete
const deleyeGroupAPI = (groupId) => {
  return function (dispatch, getState, { history }) {
    console.log(groupId, "dddfdf");
    tokenInstance
      .delete(`/groups/${groupId}`)
      .then((res) => {
        console.log(res);
        dispatch(deleyeGroupAPI(groupId));
      })
      .catch((err) => {
        console.log(err, "삭제에러");
      });
  };
};
//리듀서
export default handleActions(
  {
    [GET_WITH]: (state, action) =>
      produce(state, (draft) => {
        draft.with_list = action.payload.withList;
      }),
    [GET_WRITE]: (state, action) =>
      produce(state, (draft) => {
        draft.write_list = action.payload.writeList;
      }),
    [DELETE_GROUP]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.with_list.findIndex(
          (c) => c.groupId === action.payload.groupId
        );
        draft.with_list.splice(idx, 1);
      }),
  },
  initialState
);

const actionCreators = {
  getWithAPI,
  getWriteAPI,
  deleyeGroupAPI,
};

export { actionCreators };
