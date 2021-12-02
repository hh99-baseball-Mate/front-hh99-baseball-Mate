import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import { img, instance } from "../../lib/axios";
import { is_loaded } from "./user";

//액션
const GET_CARD = "GET_CARD";
const DELETE_COMMUNITY = "DELETE_COMMUNITY";

//액션함수
const getCard = createAction(GET_CARD, (cardList) => ({ cardList }));
const deleteCommunity = createAction(DELETE_COMMUNITY, (communityId) => ({
  communityId,
}));

//초기값
const initialState = {
  card_list: [],
};

//카트 불러오기
const getCardAPI = () => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/community`)
      .then((res) => {
        dispatch(is_loaded(true))
        // console.log(res)
        dispatch(getCard(res.data));
      })
      .catch((err) => {
        dispatch(is_loaded(false)) 
        // console.log(err, "커뮤니티카드 조회 에러")
      });
      dispatch(is_loaded(false)) 
  };
};

//커뮤니티 글작성
const postAddAPI = (communityInfo) => {
  return function (dispatch, getState, { history }) {
    instance
      .post("/community", communityInfo)
      .then((res) => {
        history.replace("/community")
      })
      .catch((err) => {
        // console.log(err, "모임 만들기 에러")
      })
  }
}

//게시글 삭제
const deleteCommunityAPI = (communityId) => {
  return function (dispatch, getState, { history }) {
    instance
      .delete(`/community/${communityId}`)
      .then((res) => {
        dispatch(deleteCommunity(communityId))
        history.replace(`/community`)
      })
      .catch((err) => {
        // console.log(err, "게시글 삭제 에러");
      })
  }
}

//리듀서
export default handleActions(
  {
    [GET_CARD]: (state, action) =>
      produce(state, (draft) => {
        draft.card_list = action.payload.cardList
      }),
    [DELETE_COMMUNITY]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.card_list.findIndex((e) => {
          return e.communityId === action.payload.communityId
        })
        if (idx !== -1) {
          draft.card_list.splice(idx, 1)
        }
      }),
  },
  initialState
)

const actionCreators = {
  getCardAPI,
  postAddAPI,
  deleteCommunityAPI,
};

export { actionCreators };
