import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:3002",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
    // authorization: "Bearer " + `${accessToken}`,
  },
})
