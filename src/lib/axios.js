import axios from "axios";
import { getCookie } from "../shared/Cookie";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const instance = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

instance.defaults.headers.common["X-AUTH-TOKEN"] = getCookie("is_login");

// // 요청 then catch 전에 인터셉터(가로채기) 가로채서 토큰이 있을 경우 저장해줌
instance.interceptors.request.use((config) => {
  const token = getCookie("is_login")
  // config.headers.Authorization = token
  if (token) {
    instance.defaults.headers.common["X-AUTH-TOKEN"] = token
  } else {
    instance.defaults.headers.common["X-AUTH-TOKEN"] = null
  }
  // console.log("인터셉터", token)
  return config
});

// 멀티 폼 이미지 넘길 시 사용

export const img = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
})

img.defaults.headers.common["X-AUTH-TOKEN"] = getCookie("is_login");
