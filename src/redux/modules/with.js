import React from "react";
import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis, img, instance, tokenInstance } from "../../lib/axios";

//액션
const GET_WITH = "GET_WITH";

//액션함수
const getWith = createAction(GET_WITH, (withList) => ({ withList }));

//초기값
const initialState = {
  with_list: [],
};

//미들웨어
const getWithAPI = () => {
  return function (getState, dispatch, { history }) {};
};
