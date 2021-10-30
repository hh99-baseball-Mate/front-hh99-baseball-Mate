import axios from "axios";

export const api = axios.create({
  baseURL: "http://54.180.148.132/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
    // authorization: "Bearer " + `${accessToken}`,
  },
});
