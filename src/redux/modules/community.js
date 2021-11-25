import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import { img, instance } from "../../lib/axios";

//액션
const GET_CARD = "GET_CARD";
const POST_ADD = "POST ADD";

//액션함수
const getCard = createAction(GET_CARD, (cardList) => ({ cardList }));
const postAdd = createAction(POST_ADD, (addList) => ({ addList }));

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
        console.log(res);
        dispatch(getCard(res.data));
      })
      .catch((err) => {
        console.log(err, "커뮤니티카드 조회 에러");
      });
  };
};

//커뮤니티 글작성
const postAddAPI = (contents) => {
  return function (dispatch, getState, { history }) {
    console.log("배고파");
    instance
      .post("/community", { content: contents })
      .then((res) => {
        console.log(res, "커뮤티니");
        dispatch(postAdd(res.data));
        history.replace("/community");
      })
      .catch((err) => {
        console.log(err, "모임 만들기 에러");
      });
  };
};
//리듀서
export default handleActions(
  {
    [GET_CARD]: (state, action) =>
      produce(state, (draft) => {
        draft.card_list = action.payload.cardList;
      }),
    [POST_ADD]: (state, action) =>
      produce(state, (draft) => {
        draft.card_list.unshift(action.payload.addList);
      }),
  },
  initialState
);

const actionCreators = {
  getCardAPI,
  postAddAPI,
};

export { actionCreators };
