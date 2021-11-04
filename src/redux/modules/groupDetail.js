import { createAction, handleActions } from "redux-actions"
import { produce } from "immer"
import { instance, apis, tokenApis } from "../../lib/axios"

const LOAD_GROUP_PAGE = "LOAD_GROUP_PAGE"
const GROUP_APPLY = "GROUP_APPLY"
const ADD_COMMENT = "ADD_COMMENT"

const load_groupPage = createAction(LOAD_GROUP_PAGE, (groupPage) => ({ groupPage }));
const group_apply = createAction(GROUP_APPLY, (groupId) => ({ groupId }));
const add_comment = createAction(ADD_COMMENT, (groupId, comment) => ({ groupId, comment }));

const initialState = {
	groupPage : []
}


// http://localhost:4000/page/group/detail/${groupId}`
const loadGroupPageMW = (groupId) => {
	return (dispatch, getState, {history}) => {
		apis
			.getGroupDetail(groupId)
			.then((res) => {
				// console.log("loadGroupPageMW", res)
				const groupPage = res.data
				dispatch(load_groupPage(groupPage))
			})
			.catch((err) => {
				console.log(err);
			})
	}
}

const groupApplyMW = (groupId) => {
	return (dispatch, getState, {history}) => {
		tokenApis
			.postApply(groupId)
			.then((res) => {
				console.log(res)
			})
			.catch((err) => {
				console.log(err)
			})
	}
}

const addCommentMW = (groupId, message) => {
	return (dispatch, getState, {history}) => {
		const comment = {comment:message}
		tokenApis
			.postComment(groupId, comment)
			.then((res) => {
				console.log(res);
				dispatch(add_comment(groupId, comment))
			})
			.catch((err) => {
				console.log(err);
			})
	}
}


// const loadMainTimelineMW = (number) => {
// 	return (dispatch, getState, { history }) => {
// 		apis
// 			.getMainTimeline(number)
// 			.then((res) => {
// 				const mainTimeline = res.data;
// 				// console.log("메인타임라인", mainTimeline)
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
		[LOAD_GROUP_PAGE]: (state, action) => produce(state, (draft) => {
			draft.groupPage = action.payload.groupPage;
		}),
		// [ADD_COMMENT]: (state, action) => produce(state, (draft) => {
		// 	draft.groupPage[action.payload.groupId].unshift(action.payload.comment);
		// }),
	},
	initialState
)


const groupDetailCreators = {
	loadGroupPageMW,
	groupApplyMW,
	addCommentMW
}

export {groupDetailCreators};