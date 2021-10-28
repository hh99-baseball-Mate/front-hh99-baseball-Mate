import { createAction, handleActions} from "redux-actions";
import produce from "immer";
import { apis, tokenApis } from "../../lib/axios";

const LOAD_TIMELINE = "LOAD_TIMELINE";
const ADD_TIMELINE = "ADD_TIMELINE";
const DELETE_TIMELINE = "DELETE_TIMELINE";
const LIKE_TIMELINE = "LIKE_TIMELINE";

const load_timeline = createAction(LOAD_TIMELINE, (timeline) => ({ timeline }));
const add_timeline = createAction(ADD_TIMELINE, (content) => ({ content }));
const delete_timeline = createAction(DELETE_TIMELINE, (id) => (id))
const like_timeline = createAction(LIKE_TIMELINE, (timeLineId) => (timeLineId))

const initialState = {
	timeline: [],
	like: [],
};


const loadTimelineMW = () => {
	return (dispatch) => {
		apis
			.getTimelime()
			.then((res) => {
				console.log(res)
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
		console.log("deleteTimeline", id)
		const timeLineId = id
		tokenApis
			.delTimeline(timeLineId)
			.then((res) => {
				console.log(res)
				dispatch(delete_timeline(id))
			})
			.catch((err) => {
				console.log(err)
			})
	}
}

const likeTimelineMW = (timeLineId, isLiked) => {
	return (dispatch, getState, { history }) => {
		console.log("likeTimeline", timeLineId, isLiked)
		tokenApis
			.likeTimeline(timeLineId, isLiked)
			.then((res) => {
				console.log(res)
				dispatch(like_timeline(timeLineId))
			})
			.catch((err) => {
				console.log(err)
			})
	}
}




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
			const idx = draft.timeline.findIndex((p) => p.id !== action.payload.id);
			if (idx !== -1) {
				draft.timeline.splice(idx, 1);
			}
		}),
		[LIKE_TIMELINE]: (state, action) => produce(state, (draft) => {
			draft.like.unshift(action.payload.timeLineId)
		}),
	},
	initialState
)


const timelineCreators = {
	loadTimelineMW,
	addTimelineMW,
	deleteTimelineMW,
	likeTimelineMW
}

export {timelineCreators};