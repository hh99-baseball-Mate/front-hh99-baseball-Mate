import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

const api = axios.create(
  {
    baseURL: "http://localhost:3001",
    headers: {
      "content-type": "application/json;charset=UTF-8",
      accept: "application/json",
    },
  },
  { withCredentials: true }
);

//액션
const SET_GROUP = "SET_GROUP";

//액션함수
const setGroup = createAction(SET_GROUP, (groupList) => ({ groupList }));

//초기값
const initialState = {
  group_list: [],
};

//미들웨어
const getGroupAPI = () => {
  return function (dispatch, getState, { history }) {
    api
      .get(`/group`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        dispatch(setGroup(res.data));
      })
      .catch((err) => {
        console.log(err, "그룹조회err");
      });
  };
};

//리듀서
export default handleActions(
  {
    [SET_GROUP]: (state, action) =>
      produce(state, (draft) => {
        draft.group_list = action.payload.groupList;
      }),
  },
  initialState
);

const actionCreators = {
  getGroupAPI,
};

export { actionCreators };
