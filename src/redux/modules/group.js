import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis, img, instance, tokenInstance } from "../../lib/axios";
import axios from "axios";

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
const SELECT_TEAM = "SELECT_TEAM";

//액션함수
const setGroup = createAction(SET_GROUP, (groupList) => ({ groupList }));
const getPlay = createAction(GET_PLAY, (playList) => ({ playList }));
const addGroup = createAction(ADD_GROUP, (addList) => ({ addList }));
const getTeam = createAction(GET_TEAM, (teamList) => ({ teamList }));

const selectTeam = createAction(SELECT_TEAM, (team) => ({ team }));
//초기값
const initialState = {
  group_list: [],
  play_list: [],
  team_list: [],
  selectTeam_list: [],

  // addlist 시험
  ex_list: [],
};

//미들웨어
const getGroupAPI = (date = "") => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/page/group/${date}`)
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

const getPlayAPI = () => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/api/kbodata`)
      .then((res) => {
        console.log(res);

        dispatch(getPlay(res.data));
      })
      .catch((err) => {
        console.log(err, "경기일정err");
      });
  };
};

const getTeamAPI = (team = "") => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/page/group/${team}`)
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

const addGroupMD = (formData) => {
  return function (dispatch, getState, { history }) {
    img
      .post("/groups", formData)
      .then((res) => {
        console.log(res.data);
        dispatch(addGroup(formData));
        history.replace("/groupList");
      })
      .catch((err) => console.log(err, "모임생성 err입니다."));
  };
};

const selectTeamMD = (myteam) => {
  return function (dispatch, getState, { history }) {
<<<<<<< HEAD
    const teamname = myteam.split(" ")
=======
    console.log(myteam);

    const my = myteam.split(" ");

    console.log(my);
>>>>>>> master

    instance
      .get(`/groups?team=${teamname[0]}`)
      .then((res) => {
        const _team = res.data;

        const team = _team.slice(-5);

        dispatch(selectTeam(team));
      })
      .catch((err) => console.log(err, "팀선택 err입니다."));
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
    [SELECT_TEAM]: (state, action) =>
      produce(state, (draft) => {
        draft.selectTeam_list = action.payload.team;
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
  selectTeam,
  selectTeamMD,
};

export { actionCreators };
