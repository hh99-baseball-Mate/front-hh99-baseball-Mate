import { createAction, handleActions } from "redux-actions"
import { produce } from "immer"
import { tokenInstance, apis, tokenApis, img } from "../../lib/axios"

const LOAD_GROUP_PAGE = "LOAD_GROUP_PAGE"
const EDIT_GROUP_PAGE = "EDIT_GROUP_PAGE"

// 모임 좋아(찜) 하기/취소하기
const LIKE_POST = "LIKE_POST"
// 모임참여, 취소
const GROUP_APPLY = "GROUP_APPLY"
const DELETE_APPLY = "DELETE_APPLY"

// 댓글기능
const ADD_COMMENT = "ADD_COMMENT"
const EDIT_COMMENT = "EDIT_COMMENT"
const DELETE_COMMENT = "DELETE_COMMENT"
const LIKE_GROUP_COMMENT = "LIKE_GROUP_COMMENT";

const LOAD_MYLIST = "LOAD_MYLIS";



const load_groupPage = createAction(LOAD_GROUP_PAGE, (groupPage) => ({ groupPage }));
const edit_groupPage = createAction(EDIT_GROUP_PAGE, (groupId, title, content) => ({ groupId, title, content }));
const like_post = createAction(LIKE_POST, (groupId, like) => ({ groupId, like }));
const group_apply = createAction(GROUP_APPLY, (my) => ({ my }));
const del_apply = createAction(DELETE_APPLY, (groupId, userid) => ({ groupId, userid }));

const add_comment = createAction(ADD_COMMENT, (groupId, comment) => ({ groupId, comment }));
const edit_comment = createAction(EDIT_COMMENT, (groupId, commentId, comment) => ({ groupId, commentId, comment }))
const del_comment = createAction(DELETE_COMMENT, (groupId, commentId) => ({ groupId, commentId }));
const like_group_comment = createAction(LIKE_GROUP_COMMENT, (groupId, commentId, like) => ({ groupId, commentId, like }));

const load_mylist = createAction(LOAD_MYLIST, (mylist) => ({ mylist }));

const initialState = {
	groupPage : {
		appliedUserInfo: [{UserImage: 'sample.png', Username: '', UserId: '', UserInx: ''}],
		canApplyNum: "",
		content: "",
		createdUserId: "",
		createdUserName: "",
		createdUserProfileImg: "",
		dday: "",
		filePath: "",
		groupCommentList: [{commentUserPicture:""}],
		groupDate: "",
		groupId: "",
		hotPercent: "",
		nowAppliedNum: "",
		peopleLimit: "",
		stadium: null,
		title: "",
	},
	mylist: {
		myGoodsLikesList: [],
		myGroupCommentLikesList: [],
		myGroupLikesList: [],
		myTimeLineLikesList: [],
		myteam: "",
		picture: null,
		userid: "",
		useridx: "",
		username: "",
		usertype: "",
	}
}


// 불러오기
const loadGroupPageMW = (groupId) => {
	return (dispatch, getState, {history}) => {
		tokenApis
			.getGroupDetail(groupId)
			.then((res) => {
				// console.log("loadGroupPageMW", res.data)
				const groupPage = res.data
				dispatch(load_groupPage(groupPage))
			})
			.catch((err) => {
				console.log(err);
			})
	}
}

// 수정하기
const editGroupPageMW = (groupId, formData) => {
	return (dispatch, getState, {history}) => {
		img
			.patch(`/groups/${groupId}`, formData)
			.then((res) => {
				console.log(res)
				history.replace(`/groupdetail/${groupId}`)
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
				dispatch(like_post(groupId, isLiked))
			})
			.catch((err) => {
				console.log(err);
			})
	}
}

// 참석하기
const groupApplyMW = (groupId, my) => {
	return (dispatch, getState, {history}) => {
		tokenApis
			.postApply(groupId)
			.then((res) => {
				console.log(res)
				dispatch(group_apply(my))
				window.alert("참여가 완료되었습니다.")
			})
			.catch((err) => {
				console.log(err)
				window.alert("재참가 할 수 없습니다.")
			})
	}
}

// 참석취소
const delApplyMW = (groupId, userid) => {
	return (dispatch, getState, {history}) => {
		tokenInstance
			.delete(`/groups/${groupId}/applications`, )
			.then((res) => {
				console.log("참석취소",res)
				dispatch(del_apply(groupId, userid))
				window.alert("모임참여가 취소되었습니다.")
			})
			.catch((err) => {
				console.log(err);
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
const likegroupCommentMW = (groupId, commentId, like) => {
	return (dispatch, getState, { history }) => {
		const isLiked = {isLiked: like};
		console.log(groupId, commentId,isLiked)
		tokenInstance
			.post(`/groups/${groupId}/comment/${commentId}/like`, isLiked)
			.then((res) => {
				console.log(res)
				dispatch(like_group_comment(groupId, commentId, isLiked))
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
		[LIKE_POST]: (state, action) => produce(state, (draft) => {
			// console.log("찜받기",action.payload.like.isLiked)
			if(action.payload.like.isLiked) {
				draft.mylist.myGroupLikesList.push(action.payload.groupId);
			} else {
				const idx = draft.mylist.myGroupLikesList.indexOf(action.payload.commentId);
				if (idx !== -1) {
					draft.mylist.myGroupLikesList.splice(idx, 1);
				}
			}
		}),
		[GROUP_APPLY]: (state, action) => produce(state, (draft) => {
			console.log("페이로드", action.payload.my)
			draft.groupPage.appliedUserInfo.push(action.payload.my)
		}),
		[DELETE_APPLY]: (state, action) => produce(state, (draft) => {
			const idx = draft.groupPage.appliedUserInfo.findIndex((p) => p.UserId === action.payload.userid);
			console.log("리덕스모임삭제", idx, action.payload.useridx)
			if (idx !== -1) {
				draft.groupPage.appliedUserInfo.splice(idx, 1);
			}
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
		[LIKE_GROUP_COMMENT]: (state, action) => produce(state, (draft) => {
			const idx = draft.groupPage.groupCommentList.findIndex((p) => p.groupCommentId === action.payload.commentId);
			// console.log("like", typeof(action.payload.like.isLiked), action.payload.like.isLiked)
			console.log("액션좋아요",action.payload.like.isLiked, idx)
			if (action.payload.like.isLiked) {
				draft.groupPage.groupCommentList[idx].groupcommentlikeCount -= 1;
				return
			} else {
				draft.groupPage.groupCommentList[idx].groupcommentlikeCount += 1;
			}
		}),
		[LOAD_MYLIST]: (state, action) => produce(state, (draft) => {
			draft.mylist = action.payload.mylist;
		}),
	},
	initialState
)


const groupDetailCreators = {
	loadGroupPageMW,
	editGroupPageMW,
	likePostMW,
	groupApplyMW,
	delApplyMW,
	addCommentMW,
	editCommentMW,
	delCommentMW,
	likegroupCommentMW,
	mylistMW
}

export {groupDetailCreators};