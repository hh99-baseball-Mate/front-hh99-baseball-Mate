import axios from "axios"

export const api = axios.create({
  // baseURL:
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
    // authorization: "Bearer " + `${accessToken}`,
  },
})
