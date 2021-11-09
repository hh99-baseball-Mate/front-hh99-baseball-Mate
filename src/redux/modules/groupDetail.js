import { createAction, handleActions } from "redux-actions"
import { produce } from "immer"
import { tokenInstance, apis, tokenApis } from "../../lib/axios"

const LOAD_GROUP_PAGE = "LOAD_GROUP_PAGE"
// 모임 좋아(찜) 하기/취소하기
const LIKE_POST = "LIKE_POST"
const GROUP_APPLY = "GROUP_APPLY"

// 댓글기능
const ADD_COMMENT = "ADD_COMMENT"
const EDIT_COMMENT = "EDIT_COMMENT"
const DELETE_COMMENT = "DELETE_COMMENT"
const LIKE_COMMENT = "LIKE_TIMELINE";

const LOAD_MYLIST = "LOAD_MYLIS";



const load_groupPage = createAction(LOAD_GROUP_PAGE, (groupPage) => ({ groupPage }));
const like_post = createAction(LIKE_POST, (groupId) => ({ groupId }));
const group_apply = createAction(GROUP_APPLY, (groupId) => ({ groupId }));

const add_comment = createAction(ADD_COMMENT, (groupId, comment) => ({ groupId, comment }));
const edit_comment = createAction(EDIT_COMMENT, (groupId, commentId, comment) => ({ groupId, commentId, comment }))
const del_comment = createAction(DELETE_COMMENT, (groupId, commentId) => ({ groupId, commentId }));
const like_comment = createAction(LIKE_COMMENT, (id, like) => ({ id, like }));

const load_mylist = createAction(LOAD_MYLIST, (mylist) => ({ mylist }));

const initialState = {
	groupPage : [],
	mylist: []
}


// 불러오기
const loadGroupPageMW = (groupId) => {
	return (dispatch, getState, {history}) => {
		tokenApis
			.getGroupDetail(groupId)
			.then((res) => {
				console.log("loadGroupPageMW", res.data)
				const groupPage = res.data
				dispatch(load_groupPage(groupPage))
			})
			.catch((err) => {
				console.log(err);
			})
	}
}

// 모임 좋아(찜) 하기/취소하기
const likePostMW = (groupId,like) => {
	return (dispatch, getState, {history}) => {
		const isLiked = {isLiked:like}
		console.log("isLiked",isLiked)
		tokenApis
			.postGroupsLike(groupId, isLiked)
			.then((res) => {
				console.log("모임찜",res)
			})
			.catch((err) => {
				console.log(err);
			})
	}
}

// 참석하기
const groupApplyMW = (groupId) => {
	return (dispatch, getState, {history}) => {
		tokenApis
			.postApply(groupId)
			.then((res) => {
				console.log(res)
			})
			.catch((err) => {
				console.log(err)
			})
	}
}

// 댓글작성
const addCommentMW = (groupId, message) => {
	return (dispatch, getState, {history}) => {
		const comment = {comment:message}
		tokenApis
			.postComment(groupId, comment)
			.then((res) => {
				console.log("댓글추가",res);
				dispatch(add_comment(groupId, comment))
			})
			.catch((err) => {
				console.log(err);
			})
	}
}

// 댓글 수정
const editCommentMW = (groupId, commentId, message) => {
	return (dispatch, getState, {history}) => {
		const comment = {comment:message}
		tokenApis
			.putComment(groupId, commentId, comment)
			.then((res) => {
				console.log("댓글수정", res)
				dispatch(edit_comment(groupId, commentId, comment))
			})
			.catch((err) => {
				console.log(err);
			})
	}
}

// 댓글삭제
const delCommentMW = (groupId, commentId) => {
	return (dispatch, getState, {history}) => {
		tokenApis
			.delComment(groupId, commentId)
			.then((res) => {
				console.log("댓글삭제",res);
				dispatch(del_comment(groupId, commentId))
			})
			.catch((err) => {
				console.log(err);
			})
	}
}

// 댓글 좋아요
const likeCommentMW = (groupId, commentId, like) => {
	return (dispatch, getState, { history }) => {
		const isLiked = {isLiked: like};
		tokenApis
			.postLikeComment(groupId, commentId, isLiked)
			.then((res) => {
				console.log(res)
				// dispatch(like_comment(timeLineId, isLiked))
			})
			.catch((err) => {
				console.log(err)
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
		[LOAD_GROUP_PAGE]: (state, action) => produce(state, (draft) => {
			draft.groupPage = action.payload.groupPage;
		}),
		[ADD_COMMENT]: (state, action) => produce(state, (draft) => {
			draft.groupPage.groupCommentList.push(action.payload.comment)
		}),
		[EDIT_COMMENT]: (state, action) => produce(state, (draft) => {
			const idx = draft.groupPage.groupCommentList.findIndex((p) => p.groupCommentId === action.payload.commentId);
      draft.groupPage.groupCommentList[idx] = {...draft.groupPage.groupCommentList[idx], ...action.payload.comment};	
		}),
		[DELETE_COMMENT]: (state, action) => produce(state, (draft) => {
			const idx = draft.groupPage.groupCommentList.findIndex((p) => p.groupCommentId === action.payload.commentId);
			if (idx !== -1) {
				draft.groupPage.groupCommentList.splice(idx, 1);
			}
		}),
		[LOAD_MYLIST]: (state, action) => produce(state, (draft) => {
			draft.mylist = action.payload.mylist;
		})
	},
	initialState
)


const groupDetailCreators = {
	loadGroupPageMW,
	likePostMW,
	groupApplyMW,
	addCommentMW,
	editCommentMW,
	delCommentMW,
	likeCommentMW,
	mylistMW
}

export {groupDetailCreators};