import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { instance, tokenInstance } from "../../lib/axios";

// const api = axios.create(
//   {
//     baseURL: "http://localhost:3001",
//     headers: {
//       "content-type": "application/json;charset=UTF-8",
//       accept: "application/json",
//     },
//   },
//   { withCredentials: true }
// );

//액션
const SET_GROUP = "SET_GROUP";
const GET_PLAY = "GET_PLAY";
const ADD_GROUP = "ADD_GROUP";
const GET_TEAM = "GET_TEAM";

//액션함수
const setGroup = createAction(SET_GROUP, (groupList) => ({ groupList }));
const getPlay = createAction(GET_PLAY, (playList) => ({ playList }));
const addGroup = createAction(ADD_GROUP, (addList) => ({ addList }));
const getTeam = createAction(GET_TEAM, (teamList) => ({ teamList }));
//초기값
const initialState = {
  group_list: [],
  play_list: [],
  team_list: [],

  // addlist 시험
  ex_list: [],
};

//미들웨어
const getGroupAPI = (date = null) => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/page/group/${date}`)
      .then((res) => {
        console.log(res)
        console.log(res.data)
        dispatch(setGroup(res.data))
      })
      .catch((err) => {
        console.log(err, "그룹조회err")
      })
  }
}

const getPlayAPI = () => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/main/myteamSchedule/롯데`)
      .then((res) => {
        console.log(res);

        dispatch(getPlay(res.data));
      })
      .catch((err) => {
        console.log(err, "경기일정err");
      });
  };
};

const getTeamAPI = () => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/page/group`)
      .then((res) => {
        console.log(res);
        dispatch(getTeam(res));
        console.log(res, "team확인");
      })
      .catch((err) => {
        console.log("팀별조회에러", err);
      });
  };
};

const addGroupMD = (addGroup_info) => {
  return function (dispatch, getState, { history }) {
    console.log(addGroup_info, "redux");

    const data = {
      ...addGroup_info,
      id: Math.floor(Math.random() * 100),
    };

    tokenInstance
      .post("/page/group", data)
      .then((res) => {
        console.log(res.data);
        dispatch(addGroup(data));
        history.push("/groupList");
      })
      .catch((err) => console.log(err, "모임생성 err입니다."));
  };
};

//리듀서
export default handleActions(
  {
    [SET_GROUP]: (state, action) =>
      produce(state, (draft) => {
        draft.group_list = action.payload.groupList;
      }),
    [GET_PLAY]: (state, action) =>
      produce(state, (draft) => {
        draft.play_list = action.payload.playList;
      }),
    [GET_TEAM]: (state, action) => produce(state, (draft) => {}),
    [ADD_GROUP]: (state, action) =>
      produce(state, (draft) => {
        draft.ex_list.push(action.payload.addList);
      }),
  },
  initialState
);

const actionCreators = {
  getGroupAPI,
  getPlayAPI,
  addGroup,
  addGroupMD,
  getTeamAPI,
};

export { actionCreators };
