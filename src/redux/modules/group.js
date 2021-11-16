import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis, img, instance, tokenInstance, tokenApis } from "../../lib/axios";

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

const GET_PLAY = "GET_PLAY";
const GET_TEAM = "GET_TEAM";
const SELECT_TEAM = "SELECT_TEAM";
const DELETE_GROUP_PAGE = "DELETE_GROUP_PAGE";
//일정선택
const DATE = "DATE";
const GET_DATE_LIST = "GET_DATE_LIST";

// 팀선택
const selectTeam = createAction(SELECT_TEAM, (team) => ({ team }));

//액션함수

const getPlay = createAction(GET_PLAY, (playList) => ({ playList }));
const getTeam = createAction(GET_TEAM, (teamList) => ({ teamList }));
const del_groupPage = createAction(DELETE_GROUP_PAGE, (groupId) => ({
  groupId,
}));
const datePage = createAction(DATE, (date) => ({ date }));
const getDateList = createAction(GET_DATE_LIST, (dateList) => ({ dateList }));

//초기값
const initialState = {
  play_list: [],
  team_list: [],
  selectTeam_list: [],
  date: "",
  date_list: [],
};

//미들웨어

//경기일정
const getPlayAPI = (team) => {
  return function (dispatch, getState, { history }) {
    // const team = 103

    instance
      .get(`/kbodatas`)
      .then((res) => {
        dispatch(getPlay(res.data));
      })
      .catch((err) => {
        console.log(err, "경기일정err");
      });
  };
};
//구단별&전체조회
const getTeamAPI = (teamname) => {
  return function (dispatch, getState, { history }) {
    if (!teamname || teamname === "전체") {
      instance
        .get("/groups")
        .then((res) => {
          dispatch(getTeam(res.data));
          console.log(res);
        })
        .catch((err) => {
          console.log(err, "전체 모임 불러오기")
        });
      return;
    }

    instance
      .get(`/groups?team=${teamname}`)
      .then((res) => {
        console.log(res.data, "구단 선택");
        dispatch(getTeam(res.data));
      })
      .catch((err) => {
        console.log("팀별조회에러", err);
      });
    // }
  };
};

// 팀선택
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
        history.replace("/groupList");
      })
      .catch((err) => console.log(err, "모임생성 err입니다."));
  };
};

// 모임삭제
const delGroupPageMW = (groupId) => {
  return (dispatch, getState, { history }) => {
    tokenApis
      .delGroupDetail(groupId)
      .then((res) => {
        console.log(res);
        dispatch(del_groupPage(groupId));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//리듀서
export default handleActions(
  {
    [GET_PLAY]: (state, action) =>
      produce(state, (draft) => {
        draft.play_list = action.payload.playList;
      }),
    [GET_TEAM]: (state, action) =>
      produce(state, (draft) => {
        draft.team_list = action.payload.teamList;
      }),
    [SELECT_TEAM]: (state, action) =>
      produce(state, (draft) => {
        draft.selectTeam_list = action.payload.team;
      }),
    [DATE]: (state, action) =>
      produce(state, (draft) => {
        const day = action.payload.date;
        const cut = day.split(" ")[0];
        draft.date = cut;
      }),

    [GET_DATE_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.date_list = action.payload.dateList;
      }),
    [DELETE_GROUP_PAGE]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.group_list.findIndex(
          (p) => p.groupId === action.payload.groupId
        );
        if (idx !== -1) {
          draft.group_list.splice(idx, 1);
        }
      }),
  },
  initialState
);

const actionCreators = {
  getPlayAPI,
  addGroupMD,
  getTeamAPI,
  selectTeamMD,
  delGroupPageMW,
  getDateList,
  datePage,
};

export { actionCreators };
