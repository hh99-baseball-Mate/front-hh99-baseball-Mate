import { createAction, handleActions} from "redux-actions";
import produce from "immer";
import { tokenInstance, apis, tokenApis } from "../../lib/axios";

const LOAD_TIMELINE = "LOAD_TIMELINE";
const ADD_TIMELINE = "ADD_TIMELINE";
const DELETE_TIMELINE = "DELETE_TIMELINE";
const LIKE_TIMELINE = "LIKE_TIMELINE";
const LOAD_LIKELIST = "LOAD_LIKELIST";
// const LOAD_MAIN_TIMELINE = "LOAD_MAIN_TIMELINE";

const load_timeline = createAction(LOAD_TIMELINE, (timeline) => ({ timeline }));
const add_timeline = createAction(ADD_TIMELINE, (content) => ({ content }));
const delete_timeline = createAction(DELETE_TIMELINE, (id) => ({ id }));
const like_timeline = createAction(LIKE_TIMELINE, (id, like) => ({ id, like }));
const load_likelist = createAction(LOAD_LIKELIST, (likelist) => ({ likelist }));
// const load_mainTimeline = createAction(LOAD_MAIN_TIMELINE, (mainTimeline) => (mainTimeline));

const initialState = {
	timeline: [],
	// like: [],
	likelist: [],
	// mainTimeline: []
};

// 전체 불러오기
const loadTimelineMW = () => {
	return (dispatch) => {
		apis
			.getTimeline()
			.then((res) => {
				// console.log("timeline", res)
				const timeline = res.data;
				dispatch(load_timeline(timeline));
			})
			.catch((err) => {
				console.log(err);
			})
	}
}

// 일정 갯수만 불러오기
const loadTimelineNumMW = (number) => {
	return (dispatch) => {
		apis
			.getTimelineNum(number)
			.then((res) => {
				// console.log("timeline", res)
				const timeline = res.data;
				dispatch(load_timeline(timeline));
			})
			.catch((err) => {
				console.log(err);
			})
	}
}

const addTimelineMW = (message) => {
	return (dispatch, getState, { history }) => {
		console.log("addTimeline", message)
		const content = {content:message}
		tokenApis
			.postTimeline(content)
			.then((res) => {
				console.log(res)
				dispatch(add_timeline(content))
			})
			.catch((err) => {
				console.log(err)
			})
	}
}


const deleteTimelineMW = (id) => {
	return (dispatch, getState, { history }) => {
		console.log("deleteTimeline", id, typeof(id))
		const timeLineId = id
		tokenApis
			.delTimeline(timeLineId)
			.then((res) => {
				// console.log(res)
				dispatch(delete_timeline(id))
			})
			.catch((err) => {
				console.log(err)
			})
	}
}

const likeTimelineMW = (id, like) => {
	return (dispatch, getState, { history }) => {
		// console.log("likeTimeline", id, like)
		const timeLineId = id;
		console.log("timeLineId", timeLineId)
		const isLiked = {isLiked: like};
		tokenApis
			.likeTimeline(timeLineId, isLiked)
			.then((res) => {
				console.log(res)
				dispatch(like_timeline(timeLineId, isLiked))
			})
			.catch((err) => {
				console.log(err)
			})
	}
}


const likeListMW = () => {
  return function (dispatch, getState, { history }) {
    tokenInstance
      .post("/user/logincheck")
      .then((res) => {
        const likelist = res.data.myTimeLineLikesList
				console.log("likelist체크", likelist)
				dispatch(load_likelist(likelist))
      })
      .catch((err) => {
				console.log(err)
			})
  }
}

// const loadMainTimelineMW = (number) => {
// 	return (dispatch, getState, { history }) => {
// 		apis
// 			.getMainTimeline(number)
// 			.then((res) => {
// 				// console.log("메인타임라인", res)
// 				const mainTimeline = res.data;
// 				dispatch(load_mainTimeline(mainTimeline))
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 			})
// 	}
// }



//reducer
export default handleActions(
	{
		[LOAD_TIMELINE]: (state, action) => produce(state, (draft) => {
			draft.timeline = action.payload.timeline;
		}),
		[ADD_TIMELINE]: (state, action) => produce(state, (draft) => {
			draft.timeline.unshift(action.payload.content)
		}),
		[DELETE_TIMELINE]: (state, action) => produce(state, (draft) => {
			const idx = draft.timeline.findIndex((p) => p.timelineId === action.payload.id);
			if (idx !== -1) {
				draft.timeline.splice(idx, 1);
			}
		}),
		[LIKE_TIMELINE]: (state, action) => produce(state, (draft) => {
			const idx = draft.timeline.findIndex((p) => p.timelineId === action.payload.id);
			// console.log("like", typeof(action.payload.like.isLiked), action.payload.like.isLiked)
			if (action.payload.like.isLiked) {
				draft.timeline[idx].likecount -= 1;
			} else {
				draft.timeline[idx].likecount += 1;
			}
		}),
		[LOAD_LIKELIST]: (state, action) => produce(state, (draft) => {
			draft.likelist = action.payload.likelist;
		}),
		// [LOAD_MAIN_TIMELINE]: (state, action) => produce(state, (draft) => {
		// 	draft.mainTimeline = action.payload.mainTimeline;
		// }),
	},
	initialState
)


const timelineCreators = {
	loadTimelineMW,
	loadTimelineNumMW,
	addTimelineMW,
	deleteTimelineMW,
	likeTimelineMW,
	likeListMW
	// loadMainTimelineMW
}

export {timelineCreators};