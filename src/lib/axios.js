import axios from "axios";
import { getCookie } from "../shared/Cookie";

// http://52.78.93.38/
// http://54.180.148.132/ 임시서버
// http://localhost:4000/
// 토큰없는 api
export const instance = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  baseURL: "http://54.180.148.132/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    // "Access-Control-Allow-Origin": "*",
    // "X-AUTH-TOKEN": getCookie("is_login"),
  },
});

export const apis = {
  // baseURL을 미리 지정해줬기 때문에 함수의 첫 번째 인자에 들어가는 url은
  // http://localhost:4000/ + 내가 작성한 url 즉 예시로
  // getPost함수에서는 instance.get('http://localhost:4000/posts')로 요청을 보내게 됩니다.
  // get과 delete의 경우 두 번째 인자에 데이터를 담아 보낼수 없기 때문에 서버에 데이터를 보낼경우 쿼리를 이용하여 보내주도록 합니다.
  // main
  // 경기 일정 불러오기
  getGameTime: () => instance.get("/kbodata"),

  // 핫한 모임 불러오기
  getHotGroup: (number) => instance.get("/groups/hotgroup"),

  // 타임라인 불러오기
  getTimeline: () => instance.get("/timelines"),

  // 메인화면 타임라인 조회
  getMainTimeline: (number) => instance.get(`/timelines?count=${number}`),
};

// 토큰인증 api
export const tokenInstance = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  baseURL: "http://54.180.148.132/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "X-AUTH-TOKEN": getCookie("is_login"),
  },
});

export const img = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  baseURL: "http://54.180.148.132/",
  headers: {
    "Content-Type": "multipart/form-data",
    accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "X-AUTH-TOKEN": getCookie("is_login"),
  },
});

export const tokenApis = {
  // 타임라인 페이지
  // 타임라인 작성하기
  postTimeline: (content) => tokenInstance.post("/timelines", content),

  // 타임라인 삭제하기
  delTimeline: (timeLineId) => tokenInstance.delete(`/timelines/${timeLineId}`),

  // 타임라인 좋아요
  likeTimeline: (timeLineId, isLiked) =>
    tokenInstance.post(`/timelines/${timeLineId}/like`, isLiked),

  // 모임게시글
  // 상세페이지 조회
  getGroupDetail: (groupId) => tokenInstance.get(`/groups/${groupId}`),

  // 모임 좋아(찜) 하기/취소하기
  postGroupsLike: (groupId, isLiked) => tokenInstance.post(`/groups/${groupId}/like`, isLiked),

  // 모임 참여하기
  postApply: (groupId) => tokenInstance.post(`/groups/${groupId}/applications`),

  // 모임 게시글 댓글 등록
  postComment: (groupId, comment) =>
    tokenInstance.post(`/groups/${groupId}/comment`, comment),

  // 모임 게시글 댓글 수정
  putComment: (groupId, commentId, comment) =>
    tokenInstance.put(`/groups/${groupId}/comment/${commentId}`, comment),

  // 모임 게시글에 댓글 삭제
  delComment: (groupId, commentId) =>
    tokenInstance.delete(`/groups/${groupId}/comment/${commentId}`),

  // 모임게시글 댓글 좋아요
  postLikeComment: (groupId, commentId, isLiked) =>
    tokenInstance.post(`/groups/${groupId}/comment/${commentId}/like`, isLiked),
};

// createPost: (contents) => instance.post('/posts', contents),
// // 게시물 수정하기
// editPost: (id, content) => instance.put(`/posts/${id}`, content),
// // 게시물 삭제하기
// delPost: (id) => instance.delete(`/posts/${id}`),
