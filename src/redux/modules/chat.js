import { createAction, handleActions } from "redux-actions"
import { produce } from "immer"
import { instance, img } from "../../lib/axios"

const LOAD_CHAT_LIST = "LOAD_CHAT_LIST"

const load_chatList = createAction(LOAD_CHAT_LIST, (list) => ({ list }))

const initialState = {
  chatList: [],
}

// const loadChat

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

// 해당 채팅방의 메세지 조회
const getChatMessagesAX = () => {
  return function (dispatch, getState, { history }) {
    const roomId = 514;

    instance
      .get(`/chat/${roomId}/messages`)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  } 
}

// 해당 채팅방 나가기
const leaveChatAX = (postId) => {
  return function (dispatch, getState, { history }) {
    instance
      .delete(`/chat/quit/${postId}`)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
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
	loadChatListMW,
  getChatMessagesAX,
  leaveChatAX
}

export {chatCreators};