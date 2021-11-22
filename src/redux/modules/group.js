import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { img, instance } from "../../lib/axios";

// 핫 그룹
const LOAD_HOTGROUP = "LOAD_HOTGROUP";

//액션

const GET_PLAY = "GET_PLAY";
const GET_TEAM = "GET_TEAM";
const SELECT_TEAM = "SELECT_TEAM";

//일정선택
const DATE = "DATE";
const GET_DATE_LIST = "GET_DATE_LIST";

// 팀선택
const selectTeam = createAction(SELECT_TEAM, (team) => ({ team }));

//액션함수

const getPlay = createAction(GET_PLAY, (play_list) => ({ play_list }));
const getTeam = createAction(GET_TEAM, (team_list) => ({ team_list }));
const datePage = createAction(DATE, (date) => ({ date }));
const load_hotgroup = createAction(LOAD_HOTGROUP, (hotGroup) => ({ hotGroup }));
const getDateList = createAction(GET_DATE_LIST, (date_list) => ({
  date_list,
}));

//초기값
const initialState = {
  // 경기일정 페이지 get
  play_list: [],

  //구단별&전체조회
  team_list: [],

  // 모임생성에서의 선택 된 팀 경기일정
  selectTeam_list: [],

  // 경기 일정 페이지에서 선택 된 날짜를 담음
  date: "",

  // 선택 된 날짜와 일치하는 경기일정
  date_list: [],

  // 핫 그룹
  hotGroup: [],
  is_loading: false,
};

//미들웨어

const hotGroupMW = (team) => {
  return (dispatch) => {
    console.log(team)
    if (!team) {
      instance
        .get(`groups/hotgroup`)
        .then((res) => {
          dispatch(load_hotgroup(res.data))
        })
        .catch((err) => console.log(err, "핫그룹에러"))
      return
    }

    instance
      .get(`groups/hotgroup?team=${team}`)
      .then((res) => {
        // console.log("핫그룹",res)
        const list = res.data
        // console.log(res)
        dispatch(load_hotgroup(list))
      })
      .catch((err) => {
        console.log(err, "핫 그룹 그룹선택 에러")
      })
  }
}

//경기일정 페이지
const getPlayAPI = (team) => {
  return function (dispatch, getState, { history }) {
    // const team = 103

    instance
      .get(`/kbodatas`)
      .then((res) => {
        dispatch(getPlay(res.data))
      })
      .catch((err) => {
        console.log(err, "경기일정err")
      })
  }
}
//구단별&전체조회
const getTeamAPI = (teamname) => {
  return function (dispatch, getState, { history }) {
    if (!teamname || teamname === "전체") {
      instance
        .get("/groups")
        .then((res) => {
          dispatch(getTeam(res.data))
          // console.log(res)
        })
        .catch((err) => {
          console.log(err, "전체 모임 불러오기")
        })
      return
    }

    instance
      .get(`/groups?team=${teamname}`)
      .then((res) => {
        // console.log(res.data, "구단 선택")
        dispatch(getTeam(res.data))
      })
      .catch((err) => {
        console.log("팀별조회에러", err)
      })
  }
}

// 모임추가 시 구단 선택 했을 시 해당 구단의 경기 일정을 보여주기
const selectTeamMD = (myteam) => {
  return function (dispatch, getState, { history }) {
    const teamname = myteam.split(" ");

    instance
      .get(`/kbodatas?team=${teamname[0]}`)
      .then((res) => {
        const _team = res.data;

        const team = _team.slice(-5);

        dispatch(selectTeam(team));
      })
      .catch((err) => console.log(err, "팀선택 err입니다."));
  };
};

// 직관 모임만들기
const addGroupMD = (formData) => {
  return function (dispatch, getState, { history }) {
    img
      .post("/groups", formData)
      .then((res) => {
        console.log(res.data);
        history.replace("/");
      })
      .catch((err) => console.log(err, "모임생성 err입니다."));
  };
};

//리듀서
export default handleActions(
  {
    [GET_PLAY]: (state, action) =>
      produce(state, (draft) => {
        draft.play_list = action.payload.play_list;
      }),
    [GET_TEAM]: (state, action) =>
      produce(state, (draft) => {
        draft.team_list = action.payload.team_list;
      }),
    [SELECT_TEAM]: (state, action) =>
      produce(state, (draft) => {
        draft.selectTeam_list = action.payload.team;
      }),
    [DATE]: (state, action) =>
      produce(state, (draft) => {
        draft.date = action.payload.date;
      }),
    [GET_DATE_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.date_list = action.payload.date_list;
      }),
    [LOAD_HOTGROUP]: (state, action) =>
      produce(state, (draft) => {
        draft.hotGroup = action.payload.hotGroup;
      }),
  },
  initialState
);

const actionCreators = {
  getPlayAPI,
  addGroupMD,
  getTeamAPI,
  selectTeamMD,
  getDateList,
  datePage,
  hotGroupMW,
};

export { actionCreators };
