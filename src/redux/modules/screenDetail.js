import { createAction, handleActions } from "redux-actions"
import { produce } from "immer"
import { tokenInstance, apis, tokenApis, instance } from "../../lib/axios"

const LOAD_SCREEN_PAGE = "LOAD_SCREEN_PAGE"

// 모임 좋아(찜) 하기/취소하기
const LIKE_POST = "LIKE_POST"

// 모임참여/취소
const SCREEN_APPLY = "SCREEN_APPLY"
const DELETE_APPLY = "DELETE_APPLY"

// 댓글기능
const ADD_COMMENT = "ADD_COMMENT"
const EDIT_COMMENT = "EDIT_COMMENT"
const DELETE_COMMENT = "DELETE_COMMENT"
const LIKE_COMMENT = "LIKE_COMMENT";

const LOAD_MYLIST = "LOAD_MYLIS";

const load_screenPage = createAction(LOAD_SCREEN_PAGE, (screenPage) => ({ screenPage }));
const like_post = createAction(LIKE_POST, (screenId, like) => ({ screenId, like }));
const screen_apply = createAction(SCREEN_APPLY, (my) => ({ my }));
const del_apply = createAction(DELETE_APPLY, (screenId, useridx) => ({ screenId, useridx }));

const add_comment = createAction(ADD_COMMENT, (screenId, comment) => ({ screenId, comment }));
const edit_comment = createAction(EDIT_COMMENT, (screenId, commentId, comment) => ({ screenId, commentId, comment }))
const del_comment = createAction(DELETE_COMMENT, (screenId, commentId) => ({ screenId, commentId }));
const like_comment = createAction(LIKE_COMMENT, (screenId, commentId, like) => ({ screenId, commentId, like }));

const load_mylist = createAction(LOAD_MYLIST, (mylist) => ({ mylist }));



const initialState = {
	screenPage: {
		appliedUserInfo: [],
		canApplyNum: "",
		content: "",
		createdUserName: "",
		filePath: "",
		groupDate: "",
		hotPercent: "",
		id: "",
		nowAppliedNum: "",
		peopleLimit: "",
		screenCommentList: [{
			comment: "",
			commentUserId: "",
			commentUserIndex: "",
			commentUsername: "",
			createdAt: "",
			modifiedAt: "",
			screenCommentId: "",
			screencommentlikeCount: "",
		}],
		title: ""
	},
	mylist: {
		address: "",
		myGoodsLikesList: [],
		myGroupCommentLikesList: [],
		myGroupLikesList: [],
		myScreenCommentLikesList: [],
		myScreenLikesList: [],
		myTimeLineLikesList: [],
		myteam: "",
		picture: "",
		selfIntroduce: "",
		userid: "",
		useridx: "",
		username: "",
		usertype: "",
	}
}

// 불러오기
const loadScreenPageMW = (screenId) => {
	return (dispatch, getState, {history}) => {
		instance
			.get(`/screen/${screenId}`)
			.then((res) => {
				console.log("loadScreenPageMW", res.data)
				const screenPage = res.data
				dispatch(load_screenPage(screenPage))
			})
			.catch((err) => {
				console.log(err);
			})
	}
}

// 모임 좋아(찜) 하기/취소하기
const likePostMW = (screenId,like) => {
	return (dispatch, getState, {history}) => {
		const isLiked = {isLiked:like}
		console.log("isLiked",isLiked)
		tokenInstance
			.post(`/screen/${screenId}/like`, isLiked)
			.then((res) => {
				console.log("모임찜",res)
				dispatch(like_post(screenId, isLiked))
			})
			.catch((err) => {
				console.log(err);
			})
	}
}


// 참여하기
const screenApplyMW = (screenId, my) => {
	return (dispatch, getState, {history}) => {
		tokenInstance
			.post(`/screen/${screenId}/applications`)
			.then((res) => {
				console.log(res)
				dispatch(screen_apply(my))
			})
			.catch((err) => {
				console.log(err)
			})
	}
}

// 참석취소
const delApplyMW = (screenId, useridx) => {
	return (dispatch, getState, {history}) => {
		tokenInstance
			.delete(`/screen/${screenId}/applications`)
			.then((res) => {
				console.log(res)
				dispatch(del_apply(screenId, useridx))
			})
			.catch((err) => {
				console.log(err);
			})
	}		
}


// 댓글작성
const addCommentMW = (screenId, message) => {
	return (dispatch, getState, {history}) => {
		const comment = {comment:message}
		tokenInstance
			.post(`/screen/${screenId}/comment`, comment)
			.then((res) => {
				console.log("댓글추가",res);
				dispatch(add_comment(screenId, comment))
			})
			.catch((err) => {
				console.log(err);
			})
	}
}


// 나의 리스트 불러오기
const mylistMW = () => {
  return function (dispatch, getState, { history }) {
    tokenInstance
      .post("/user/logincheck")
      .then((res) => {
				console.log("좋아요리스트", res.data)
        const mylist = res.data
				// console.log("likelist체크", likelist)
				dispatch(load_mylist(mylist))
      })
      .catch((err) => {
				console.log(err)
			})
  }
}


//reducer
export default handleActions(
	{
		[LOAD_SCREEN_PAGE]: (state, action) => produce(state, (draft) => {
			draft.screenPage = action.payload.screenPage;
		}),
		[LIKE_POST]: (state, action) => produce(state, (draft) => {
			// console.log("찜받기",action.payload.like.isLiked)
			if(action.payload.like.isLiked) {
				draft.mylist.myScreenLikesList.push(action.payload.screenId);
				return
			} else {
				const idx = draft.mylist.myScreenLikesList.indexOf(action.payload.screenId);
				if (idx !== -1) {
					draft.mylist.myScreenLikesList.splice(idx, 1);
				}
			}
		}),
		[ADD_COMMENT]: (state, action) => produce(state, (draft) => {
			draft.screenPage.screenCommentList.push(action.payload.comment)
		}),

		[LOAD_MYLIST]: (state, action) => produce(state, (draft) => {
			draft.mylist = action.payload.mylist;
		}),

	},
	initialState
)

const screenDetailCreators = {
	loadScreenPageMW,
	likePostMW,
	screenApplyMW,
	delApplyMW,
	addCommentMW,
	mylistMW
}

export {screenDetailCreators};