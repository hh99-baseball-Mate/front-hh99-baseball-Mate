import { createAction, handleActions} from "redux-actions";
import produce from "immer";
import { apis } from "../../lib/axios";

const LOAD_GAMETIME = "LOAD_GAMETIME";

const load_gameTime = createAction(LOAD_GAMETIME, (list) => ({ list }));

const initialState = {
	list: [],
};

const gameTimeMW = () => {
	return (dispatch) => {
		apis
			.getGameTime()
			.then((res) => {
				// console.log(res)
				const list = res.data;
				dispatch(load_gameTime(list));
			})
			.catch((err) => {
				console.log(err);
			})
	}
}


//reducer
export default handleActions(
	{
		[LOAD_GAMETIME]: (state, action) => produce(state, (draft) => {
			draft.list = action.payload.list;
		}),
	},
	initialState
)


const gameTimeCreators = {
	gameTimeMW
}

export {gameTimeCreators};