import { createAction, handleActions } from "redux-actions"
import { produce } from "immer"
import { instance, img } from "../../lib/axios"

const LOAD_ALARM = "LOAD_ALARM"

const load_alarm = createAction(LOAD_ALARM, (alarm) => ({ alarm }))

const initialState = {
  alarmList: [],
}

// const load_alarmMW = () => {
// 	return (dispatch) = {
// 		instance
// 			.get("/alarm")
// 			.then((res) => {
// 				console.log(res)
// 			})
// 			.catch((err) => {
// 				console.log(err)
// 			})
// 	}
// }

const load_alarmMW = () => {
	return (dispatch) => {
		instance
			.get("/alarm")
			.then((res) => {
				console.log(res)
			})
			.catch((err) => {
				console.log(err)
			})
	}
}




const alarmCreators = {
	load_alarmMW,
}

export {alarmCreators};