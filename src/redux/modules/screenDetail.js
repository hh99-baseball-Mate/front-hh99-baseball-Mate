import { createAction, handleActions } from "redux-actions"
import { produce } from "immer"
import { instance, img } from "../../lib/axios"

const LOAD_SCREEN_PAGE = "LOAD_SCREEN_PAGE"
// const DELETE_SCREEN_PAGE = "DELETE_SCREEN_PAGE";

// 모임 좋아(찜) 하기/취소하기
const SCREEN_LIKE_POST = "SCREEN_LIKE_POST"

// 모임참여/취소
const SCREEN_APPLY = "SCREEN_APPLY"
const SCREEN_DELETE_APPLY = "SCREEN_DELETE_APPLY"

// 방장이 모임확정/취소
const SCREEN_CONFIRM = "SCREEN_CONFIRM"

// 댓글기능
const SCREEN_ADD_COMMENT = "SCREEN_ADD_COMMENT"
const SCREEN_EDIT_COMMENT = "SCREEN_EDIT_COMMENT"
const SCREEN_DELETE_COMMENT = "SCREEN_DELETE_COMMENT"
const SCREEN_LIKE_COMMENT = "SCREEN_LIKE_COMMENT"

const LOAD_SCREEN_MYLIST = "LOAD_SCREEN_MYLIST"

const load_screenPage = createAction(LOAD_SCREEN_PAGE, (screenPage) => ({
  screenPage,
}))
// const del_screenPage = createAction(DELETE_SCREEN_PAGE, (groupId) => ({ groupId }));

const like_post = createAction(SCREEN_LIKE_POST, (screenId, like) => ({
  screenId,
  like,
}))
const screen_apply = createAction(SCREEN_APPLY, (my) => ({ my }))
const del_apply = createAction(SCREEN_DELETE_APPLY, (screenId, userid) => ({
  screenId,
  userid,
}))

// 그룹 확정/취소
const screen_confirm = createAction(SCREEN_CONFIRM, (allowtype) => ({ allowtype }))

const add_comment = createAction(SCREEN_ADD_COMMENT, (screenId, comment) => ({
  screenId,
  comment,
}))
const edit_comment = createAction(
  SCREEN_EDIT_COMMENT,
  (screenId, commentId, comment) => ({ screenId, commentId, comment })
)
const del_comment = createAction(SCREEN_DELETE_COMMENT, (screenId, commentId) => ({
  screenId,
  commentId,
}))
const like_comment = createAction(
  SCREEN_LIKE_COMMENT,
  (screenId, commentId, like) => ({ screenId, commentId, like })
)

const load_mylist = createAction(LOAD_SCREEN_MYLIST, (mylist) => ({ mylist }))

const initialState = {
  screenPage: [],
  screenMylist: {
		myGoodsLikesList: [],
		myGroupCommentLikesList: [],
		myGroupLikesList: [],
		myScreenCommentLikesList: [],
		myScreenLikesList: [],
		myTimeLineLikesList: [],
	},
}

// 불러오기
const loadScreenPageMW = (screenId) => {
  return (dispatch, getState, { history }) => {
    instance
      .get(`/screen/${screenId}`)
      .then((res) => {
        // // console.log("loadScreenPageMW", res.data)
        const screenPage = res.data
        dispatch(load_screenPage(screenPage))
      })
      .catch((err) => {
        // console.log(err)
      })
  }
}

// 수정하기
const editGroupPageMW = (screenId, screenEditInfo) => {
  return (dispatch, getState, { history }) => {
    instance
      .put(`/screen/${screenId}`, screenEditInfo)
      .then((res) => {
        // // console.log(res)
        history.replace(`/screen/screendetail/${screenId}`)
      })
      .catch((err) => {
        // console.log(err)
      })
  }
}

// 모임삭제
const delScreenPageMW = (screenId) => {
  return (dispatch, getState, { history }) => {
    instance
      .delete(`/screen/${screenId}`)
      .then((res) => {
        // // console.log(res)
        // dispatch(del_groupPage(groupId));
        history.replace("/screen")
      })
      .catch((err) => {
        // console.log(err)
      })
  }
}

// 모임 좋아(찜) 하기/취소하기
const likePostMW = (screenId, like) => {
  return (dispatch, getState, { history }) => {
    const isLiked = { isLiked: like }
    // // console.log("isLiked", isLiked)
    instance
      .post(`/screen/${screenId}/like`, isLiked)
      .then((res) => {
        // console.log("모임찜", res)
        dispatch(like_post(screenId, isLiked))
        if (!like) {
          window.alert("찜 되었습니다!")
        }
      })
      .catch((err) => {
        // console.log(err)
      })
  }
}

// 참여하기
const screenApplyMW = (screenId, my) => {
  return (dispatch, getState, { history }) => {
    instance
      .get(`/screen/join/request/${screenId}`)
      .then((res) => {
        // console.log(res)
        // dispatch(screen_apply(my))
        window.alert(res.data)
      })
      .catch((err) => {
        // console.log(err)
        window.alert("재참가 할 수 없습니다.")
      })
  }
}

// 참석취소
const delApplyMW = (screenId, userid) => {
  return (dispatch, getState, { history }) => {
    instance
      .delete(`/screen/join/request/${screenId}`)
      .then((res) => {
        // // console.log("참석취소", res)
        dispatch(del_apply(screenId, userid))
        window.alert("모임참여가 취소되었습니다.")
      })
      .catch((err) => {
        // console.log(err)
      })
  }
}

// 댓글작성
const addCommentMW = (screenId, message) => {
  return (dispatch, getState, { history }) => {
    const comment = { comment: message }
    instance
      .post(`/screen/${screenId}/comment`, comment)
      .then((res) => {
        // // console.log("댓글추가", res)
        dispatch(add_comment(screenId, comment))
      })
      .catch((err) => {
        // console.log(err)
      })
  }
}

// 댓글 수정
const editCommentMW = (screenId, commentId, message) => {
  return (dispatch, getState, { history }) => {
    const comment = { comment: message }
    instance
      .put(`/screen/${screenId}/comment/${commentId}`, comment)
      .then((res) => {
        // // console.log("댓글수정", res)
        dispatch(edit_comment(screenId, commentId, comment))
      })
      .catch((err) => {
        // console.log(err)
      })
  }
}

// 댓글삭제
const delCommentMW = (screenId, commentId) => {
  return (dispatch, getState, { history }) => {
    instance
      .delete(`/screen/${screenId}/comment/${commentId}`)
      .then((res) => {
        // // console.log("댓글삭제", res)
        dispatch(del_comment(screenId, commentId))
      })
      .catch((err) => {
        // console.log(err)
      })
  }
}

// 댓글 좋아요
const likeCommentMW = (screenId, commentId, like) => {
  return (dispatch, getState, { history }) => {
    const isLiked = { isLiked: like }
    // // console.log(screenId, commentId, isLiked)
    instance
      .post(`/screen/${screenId}/comment/${commentId}/like`, isLiked)
      .then((res) => {
        // // console.log(res)
        dispatch(like_comment(screenId, commentId, like))
      })
      .catch((err) => {
        // console.log(err)
      })
  }
}

// 나의 리스트 불러오기
const mylistMW = () => {
  return function (dispatch, getState, { history }) {
    instance
      .post("/user/logincheck")
      .then((res) => {
        // // console.log("좋아요리스트", res.data)
        const mylist = res.data
        // // console.log("likelist체크", likelist)
        dispatch(load_mylist(mylist))
      })
      .catch((err) => {
        // console.log(err)
      })
  }
}

// 모임확정/취소하기
const confirmMW = (screenId, allowtype) => {
  return function (dispatch, getState, { history }) {
    // const isLiked = { isLiked: like }
    instance
      .patch(`/screen/${screenId}/applications`)
      .then((res) => {
        // console.log(res)
        const msg = res.data.message
        window.alert(msg)
        dispatch(screen_confirm(allowtype))
      })
      .catch((err) => {
        // console.log(err)
        window.alert(err)
      })
  }
}

//reducer
export default handleActions(
  {
    [LOAD_SCREEN_PAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.screenPage = action.payload.screenPage
      }),
    [SCREEN_LIKE_POST]: (state, action) =>
      produce(state, (draft) => {
        // // console.log("찜받기",action.payload.like.isLiked)
        if (action.payload.like.isLiked) {
          draft.screenMylist.myScreenLikesList.push(action.payload.screenId)
          return
        } else {
          const idx = draft.screenMylist.myScreenLikesList.indexOf(
            action.payload.screenId
          )
          if (idx !== -1) {
            draft.screenMylist.myScreenLikesList.splice(idx, 1)
          }
        }
      }),
    // [SCREEN_APPLY]: (state, action) =>
    //   produce(state, (draft) => {
    //     // // console.log("페이로드", action.payload.my)
    //     draft.screenPage.appliedUserInfo.push(action.payload.my)
    //   }),
    [SCREEN_DELETE_APPLY]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.screenPage.appliedUserInfo.findIndex(
          (p) => p.UserId === action.payload.userid
        )
        // // console.log("리덕스모임삭제", idx)
        if (idx !== -1) {
          draft.screenPage.appliedUserInfo.splice(idx, 1)
        }
      }),
    // 모임 확정/취소
    [SCREEN_CONFIRM]: (state, action) =>
      produce(state, (draft) => {
        draft.screenPage.allowtype = action.payload.allowtype
      }),
    [SCREEN_ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.screenPage.screenCommentList.push(action.payload.comment)
      }),
    [SCREEN_EDIT_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.screenPage.screenCommentList.findIndex(
          (p) => p.screenCommentId === action.payload.commentId
        )
        draft.screenPage.screenCommentList[idx] = {
          ...draft.screenPage.screenCommentList[idx],
          ...action.payload.comment,
        }
      }),
    [SCREEN_DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.screenPage.screenCommentList.findIndex(
          (p) => p.screenCommentId === action.payload.commentId
        )
        if (idx !== -1) {
          draft.screenPage.screenCommentList.splice(idx, 1)
        }
      }),
    [SCREEN_LIKE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.screenPage.screenCommentList.findIndex(
          (p) => p.screenCommentId === action.payload.commentId
        )
        // // console.log("like", typeof(action.payload.like.isLiked), action.payload.like.isLiked)
        // console.log("액션좋아요", action.payload.like)
        if (action.payload.like) {
          draft.screenPage.screenCommentList[idx].screencommentlikeCount -= 1
          return
        } else {
          draft.screenPage.screenCommentList[idx].screencommentlikeCount += 1
        }
      }),
    [LOAD_SCREEN_MYLIST]: (state, action) =>
      produce(state, (draft) => {
        draft.screenMylist = action.payload.mylist
      }),
  },
  initialState
)

const screenDetailCreators = {
	loadScreenPageMW,
	editGroupPageMW,
	delScreenPageMW,
	likePostMW,
	screenApplyMW,
	delApplyMW,
	addCommentMW,
	editCommentMW,
	delCommentMW,
	likeCommentMW,
	mylistMW,
  confirmMW,
}

export {screenDetailCreators};