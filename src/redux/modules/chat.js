import { createAction, handleActions } from "redux-actions"
import { produce } from "immer"
import { instance, img } from "../../lib/axios"
import { is_loaded } from "./user"

// 채팅방 리스트
const LOAD_CHAT_LIST = "LOAD_CHAT_LIST"
// 채팅 대화 내용 불러오기
const LOAD_MSG = "LOAD_MSG"
// 참여유저
const LOAD_CHAT_USER = "LOAD_CHAT_USER"
// 새로입력되는 메세지(리스트 형태) 내용을 메세지에 추가
const GET_MSG = "GET_MSG";

const load_chatList = createAction(LOAD_CHAT_LIST, (list) => ({ list }))
const load_msg = createAction(LOAD_MSG, (msg) => ({ msg }))
const load_chatUser = createAction(LOAD_CHAT_USER, (chatUser) => ({ chatUser }));
const getMessages = createAction(GET_MSG, (newMessage) => ({ newMessage }));

const initialState = {
  chatList: [],

  currentChat: [], //채팅방에 
  // 현재 접속한 채팅 메시지 (DB저장된 내용에 추가되는 메세지 push)
  messages: [],
  // 채팅방 참여중인 사용자 목록
  chatUser: [],
}

// const loadMyChatListMW = () => {
//   return (dispatch) => {
//     instance
//       .get("/chat/rooms/mine")
//   }
// }

// 불러오기
const loadChatListMW = () => {
  return (dispatch, getState, { history }) => {
    instance
      .get("/chat/rooms/mine")
      .then((res) => {
        dispatch(is_loaded(true))
        console.log(res.data)
        const list = res.data
        dispatch(load_chatList(list))
      })
      .catch((err) => {
        // console.log(err)
      })
      dispatch(is_loaded(false)) 
  }
}

// 해당 채팅방의 메세지 조회
const getChatMessagesAX = (roomId) => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/chat/${roomId}/messages`)
      .then((res) => {
        // console.log(res)
        const msg = res.data.content
        // console.log("mgs", msg)
        dispatch(load_msg(msg))
      })
      .catch((err) => {
        // console.log(err)
      })
  }
}

// 채팅방 유저목록조회
const getChatUserAX = (roomId) => {
  return (dispatch) => {
    instance.get(`/chat/user/${roomId}`).then((res) => {
      // console.log("유저목록조회", res.data)
      const chatUser = res.data
      dispatch(load_chatUser(chatUser))
    })
  }
}

// 해당 채팅방 나가기
const leaveChatAX = (groupId) => {
  return function (dispatch, getState, { history }) {
    instance
      .delete(`/chat/quit/${groupId}`)
      .then((res) => {
        // console.log(res)
        history.replace("/chatlist")
      })
      .catch((err) => {
        // console.log(err)
      })
  }
}

// 스크린야구 모임 채팅방 나가기
const leaveScreenChatAX = (groupId) => {
  return function (dispatch, getState, { history }) {
    instance
      .delete(`/chat/screen/quit/${groupId}`)
      .then((res) => {
        // console.log(res)
        history.replace("/chatlist")
      })
      .catch((err) => {
        // console.log(err)
      })
  }
}

//reducer
export default handleActions(
  {
    [LOAD_CHAT_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.chatList = action.payload.list
      }),
    [LOAD_MSG]: (state, action) =>
      produce(state, (draft) => {
        // 이전 메세지 내역중 유형이 대화인 내용만 리덕스에 저장
        // const messegeList = action.payload.msg.filter(
        //   (list) => list.type === "TALK"
        // )
        // draft.messages = messegeList

        draft.messages = action.payload.msg
      }),
    [LOAD_CHAT_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.chatUser = action.payload.chatUser
      }),
    // getMessages - 새로운 메세지 정보를 메세지 리스트에 추가
    // [GET_MSG]: (state, action) => produce(state, (draft) => {
    //   const msg = action.payload.newMessage;
    //   const new_msg = {
    //     createdAt: msg.createdAt,
    //     id: msg.id,
    //     message: msg.message,
    //     modifiedAt: msg.modifiedAt,
    //     roomId: msg.roomId,
    //     senderId: msg.senderId,
    //     senderImage: msg.senderImage,
    //     senderName: msg.senderName,
    //     type: msg.type,
    //   }
    //   draft.messages.push(new_msg)
    // })
  },
  initialState
)

const chatCreators = {
	loadChatListMW,
  getChatMessagesAX,
  getChatUserAX,
  getMessages,
  leaveChatAX,
  leaveScreenChatAX,
  load_msg
}

export {chatCreators};