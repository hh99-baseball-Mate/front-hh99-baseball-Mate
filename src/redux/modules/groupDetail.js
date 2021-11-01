import { createAction, handleActions } from "redux-actions"
import { produce } from "immer"
import { instance } from "../../lib/axios"

const LOAD_GROUP_PAGE = "LOAD_GROUP_PAGE"

const load_groupPage = createAction(LOAD_GROUP_PAGE, (groupPage) => ({ groupPage }));

const initialState = {
	groupPage : []
}


// http://localhost:4000/page/group/detail/${groupId}`
const loadGroupPageMW = () => {
	return (dispatch, getState, {history}) => {
		instance
			.get("/detailGroup")
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

	},
	initialState
)


const groupDetailCreators = {
	loadGroupPageMW
}

export {groupDetailCreators};