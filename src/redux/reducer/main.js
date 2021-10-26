import { createAction, handleActions} from "redux-actions";
import produce from "immer";
import { apis } from "../../lib/axios";

const LOAD_HOTGROUP = "LOAD_HOTGROUP";

const load_hotgroup = createAction(LOAD_HOTGROUP, (hotGroup) => ({ hotGroup }));

const initialState = {
	hotGroup: [],
};

const hotGroupMW = () => {
	return (dispatch) => {
		apis
			.getHotGroup()
			.then((res) => {
				console.log(res)
				const list = res.data;
				dispatch(load_hotgroup(list));
			})
			.catch((err) => {
				console.log(err);
			})
	}
}


//reducer
export default handleActions(
	{
		[LOAD_HOTGROUP]: (state, action) => produce(state, (draft) => {
			draft.hotGroup = action.payload.hotGroup;
		}),
	},
	initialState
)


const mainCreators = {
	hotGroupMW
}

export {mainCreators};