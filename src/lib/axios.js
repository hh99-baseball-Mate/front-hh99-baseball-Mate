import axios from "axios";
import { number } from "yup/lib/locale";
import { getCookie } from "../shared/Cookie";

// http://52.78.93.38/
// http://54.180.148.132/ 임시서버
// http://localhost:4000/
// 토큰없는 api

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const instance = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    // "Access-Control-Allow-Origin": "*",
    // "X-AUTH-TOKEN": getCookie("is_login"),
  },
});

// 토큰인증 api
export const tokenInstance = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  baseURL: BASE_URL,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "X-AUTH-TOKEN": getCookie("is_login"),
  },
});

export const img = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "X-AUTH-TOKEN": getCookie("is_login"),
  },
});