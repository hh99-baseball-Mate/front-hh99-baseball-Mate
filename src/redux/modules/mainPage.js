import { createAction, handleActions} from "redux-actions";
import produce from "immer";
import { apis } from "../../lib/axios";

const LOAD_GAMETIME = "LOAD_GAMETIME";
const LOAD_HOTGROUP = "LOAD_HOTGROUP";

const load_gameTime = createAction(LOAD_GAMETIME, (gamelist) => ({ gamelist }));
const load_hotgroup = createAction(LOAD_HOTGROUP, (hotGroup) => ({ hotGroup }));

const initialState = {
	gamelist: [],
	hotGroup: [],
};


const gameTimeMW = () => {
	return (dispatch) => {
		apis
			.getGameTime()
			.then((res) => {
				// console.log(res)
				const gamelist = res.data;
				const today = new Date();  
				console.log(today.toLocaleDateString('en-KR').split("/")[1]) //-> 10/27, 27
				console.log(gamelist[124].date.split(" ")[0].split(".")[1]) // -> 10/30
				// let nowDate = today.toLocaleDateString('en-KR').split("/").slice(0,2).join("-")
				// let gameDay = gamelist[124].date.split(" ")[0].split(".").join("-")
				let nowDate = today.toLocaleDateString('en-KR').split("/")[1]
				let gameDay = gamelist[124].date.split(" ")[0].split(".")[1]

				// for (let i=0; i < gamelist.length; i++) {
				// 	// let date =gamelist[i].date
				// 	let date = gamelist[i].date.split(" ")[0].split(".")[1]
				// 		// console.log(nowDate)
				// 		// console.log(date)
				// 		if(nowDate <= date) {
				// 			return console.log(date)
				// 		} 
				// 	// console.log(date)
				// }
				// if(nowDate <= gameDay) {
				// 	console.log("시간비교",true)
				// } else {
				// 	console.log("시간비교",false)
				// }

				dispatch(load_gameTime(gamelist));
			})
			.catch((err) => {
				console.log(err);
			})
	}
}


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
		[LOAD_GAMETIME]: (state, action) => produce(state, (draft) => {
			draft.gamelist = action.payload.gamelist;
		}),
		[LOAD_HOTGROUP]: (state, action) => produce(state, (draft) => {
			draft.hotGroup = action.payload.hotGroup;
		}),
	},
	initialState
)


const mainCreators = {
	gameTimeMW,
	hotGroupMW
}

export {mainCreators};