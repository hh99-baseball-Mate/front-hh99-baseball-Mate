import { createAction, handleActions } from "redux-actions"
import { produce } from "immer"
import { instance, img } from "../../lib/axios"

const LOAD_CHAT_LIST = "LOAD_CHAT_LIST"

const load_chatList = createAction(LOAD_CHAT_LIST, (list) => ({ list }))

const initialState = {
  chatList: [],
}

// 불러오기
const loadChatListMW = () => {
  return (dispatch, getState, { history }) => {
    instance
      .get("/chat/rooms/mine")
      .then((res) => {
        console.log(res.data)
				const list = res.data
				dispatch(load_chatList(list))
      })
      .catch((err) => {
        console.log(err);
      })
  }
}



export default handleActions(
	{
		[LOAD_CHAT_LIST]: (state, action) => produce(state, (draft) => {
			draft.chatList = action.payload.list;
		}),
	},
	initialState
)


const chatCreators = {
	loadChatListMW
}

export {chatCreators};