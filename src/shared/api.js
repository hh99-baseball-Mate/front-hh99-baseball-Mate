import axios from "axios"

export const api = axios.create({
  baseURL: "http://52.78.93.38/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
    // authorization: "Bearer " + `${accessToken}`,
  },
})
