import { createAction, handleActions } from "redux-actions"
import { produce } from "immer"
import { instance, img } from "../../lib/axios"
import { is_loaded } from "./user"

const LOAD_ALARM = "LOAD_ALARM"
const DELETE_ALARM = "DELETE_ALARM"
// 경기모임 입장 요청 리스트(방장용)
const SET_REQ_LIST = "SET_REQ_LIST"
// 경기모임 입장 대기 리스트(신청자용)
const AWAIT_LIST = "AWAIT_LIST";

// 스크린야구모임 입장 요청 리스트(방장용)
const SET_SCREEN_REQ_LIST = "SET_SCREEN_REQ_LIST"
// 스크린야구모임 입장 대기 리스트(신청자용)
const AWAIT_SCREEN_LIST = "AWAIT_SCREEN_LIST";

const load_alarm = createAction(LOAD_ALARM, (alarm) => ({ alarm }))
const delete_alarm = createAction(DELETE_ALARM, (alarmId) => ({ alarmId }))
// 경기모임 들어온 요청 대기 목록
const setRequestList = createAction(SET_REQ_LIST, (request_list) => ({ request_list }));
// 경기모임 보낸 요청 승인 대기 목록
const setAwaitList = createAction(AWAIT_LIST, (await_list) => ({ await_list }));

// 스크린야구모임 들어온 요청 대기 목록
const setScreenRequestList = createAction(SET_SCREEN_REQ_LIST, (request_list) => ({ request_list }));
// 스크린야구모임 보낸 요청 승인 대기 목록
const setScreenAwaitList = createAction(AWAIT_SCREEN_LIST, (await_list) => ({ await_list }));

const initialState = {
  alarmList: [], // 전체 알람 리스트

	requestList: [], // 방장에게 보이는 승인요청 리스트
	awaitList: [], 	 // 승인 대기중인 리스트

	requestScreenList: [], // 방장에게 보이는 승인요청 리스트(스크린야구)
	awaitScreenList: [], 	 // 승인 대기중인 리스트(스크린야구)
}

// 알람 읽기
const load_alarmMW = () => {
  return (dispatch) => {
    instance
      .get("/alarm")
      .then((res) => {
        dispatch(is_loaded(true))
        const alarm = res.data
        dispatch(load_alarm(alarm))
      })
      .catch((err) => {
        dispatch(is_loaded(false)) 
        // // console.log(err)
      })
      dispatch(is_loaded(false)) 
  }
}

// 알람삭제
const del_alarmMW = (alarmId) => {
  return (dispatch) => {
    instance
      .delete(`/alarm/${alarmId}`)
      .then((res) => {
        // // console.log(res)
        dispatch(delete_alarm(alarmId))
      })
      .catch((err) => {
        // // console.log(err)
      })
  }
}

// 방장의 알림창에서 신청들어온 데이터조회하기(경기모임)
const requestChatListMW = () => {
  return (dispatch) => {
    instance
      .get("/groups/join/request/list")
      .then((res) => {
        // // console.log(res.data)
        const request_list = res.data
        // let request_list = [];
        // res.data.forEach((req) => {
        // 	let one_req = {
        // 		join_id: req.joinRequestId,
        // 		user_id: req.userId,
        // 		username: req.username,
        // 		user_img: req.profileImg,
        // 		title: req.postTitle,
        // 	};
        // 	request_list.push(one_req);
        // });

        dispatch(setRequestList(request_list))
      })
      .catch((err) => {
        // // console.log(err)
      })
  }
}

// 경기모임 (방장이 참여자들을)참여승인하기 / 거절하기
const alarmComfirmMW = (joinRequestId, join) => {
  return (dispatch) => {
    instance
      .get(`/groups/join/request/accept/${joinRequestId}?accept=${join}`)
      .then((res) => {
        // // console.log(res)
      })
      .catch((err) => {
        // // console.log(err)
      })
  }
}

// 경기모임 (참여자기준) 대기중인 신청 목록
const awaitChatListMW = () => {
  return function (dispatch) {
    instance
      .get("/groups/join/request/await")
      .then((res) => {
        const await_list = res.data

        // res.data.forEach((l) => {
        //   let one_list = {
        //     title: l.postTitle,
        //     join_id: l.joinRequestId,
        //   };
        //   await_list.push(one_list);
        // });

        dispatch(setAwaitList(await_list))
      })
      .catch((err) => {
        // // console.log(err)
      })
  }
}

// 방장의 알림창에서 신청들어온 데이터조회하기(스크린야구)
const requestScreenChatListMW = () => {
  return (dispatch) => {
    instance
      .get("/screen/join/request/list")
      .then((res) => {
        // // console.log(res.data)
        const request_list = res.data

        // let request_list = [];
        // res.data.forEach((req) => {
        // 	let one_req = {
        // 		join_id: req.joinRequestId,
        // 		user_id: req.userId,
        // 		username: req.username,
        // 		user_img: req.profileImg,
        // 		title: req.postTitle,
        // 	};
        // 	request_list.push(one_req);
        // });

        dispatch(setScreenRequestList(request_list))
      })
      .catch((err) => {
        // // console.log(err)
      })
  }
}

// (방장이 참여자들을)참여승인하기 / 거절하기(스크린야구)
const alarmScreenComfirmMW = (joinRequestId, join) => {
  return (dispatch) => {
    instance
      .get(`/screen/join/request/accept/${joinRequestId}?accept=${join}`)
      .then((res) => {
        // console.log(res)
      })
      .catch((err) => {
        // console.log(err)
      })
  }
}

// 스크린모임 (참여자기준) 대기중인 신청 목록
const awaitScreenChatListMW = () => {
  return function (dispatch) {
    instance
      .get("/screen/join/request/await")
      .then((res) => {
        const await_ScreenList = res.data
        // console.log("스크린이야",await_ScreenList)
        // logger("대기 목록", res);
        // let await_list = [];
        // res.data.forEach((l) => {
        //   let one_list = {
        //     title: l.postTitle,
        //     join_id: l.joinRequestId,
        //   };
        //   await_list.push(one_list);
        // });

        dispatch(setScreenAwaitList(await_ScreenList))
      })
      .catch((err) => {
        // console.log(err)
      })
  }
}

export default handleActions({
	[LOAD_ALARM]: (state, action) => produce(state, (draft) => {
		draft.alarmList = action.payload.alarm
	}),
	[DELETE_ALARM]: (state, action) => produce(state, (draft) => {
		const idx = draft.alarmList.findIndex((p) => p.id === action.payload.alarmId);
		if (idx !== -1) {
			draft.alarmList.splice(idx, 1);
		}
	}),
	[SET_REQ_LIST]: (state, action) => produce(state, (draft) => {
		draft.requestList = action.payload.request_list;
	}),
	[AWAIT_LIST]: (state, action) => produce(state, (draft) => {
		draft.awaitList = action.payload.await_list;
	}),
	[SET_SCREEN_REQ_LIST]: (state, action) => produce(state, (draft) => {
		draft.requestScreenList = action.payload.request_list;
	}),
	[AWAIT_SCREEN_LIST]: (state, action) => produce(state, (draft) => {
		draft.awaitScreenList = action.payload.await_list;
	}),
}, initialState)

const alarmCreators = {
	load_alarmMW,
	del_alarmMW,
	requestChatListMW,
	alarmComfirmMW,
	awaitChatListMW,
	requestScreenChatListMW,
	alarmScreenComfirmMW,
	awaitScreenChatListMW
}

export {alarmCreators};