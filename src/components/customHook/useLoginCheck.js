import React from "react"
import { useSelector } from "react-redux"
import { history } from "../../redux/configStore"

export const useLoginCheck = (truePath, falsePath) => {
  const is_login = useSelector((state) => state.user.is_login)

  const pathHandle = (truePath, falsePath) => {
    if (!is_login) {
      window.alert("로그인 후 이용해주세요")
      history.push(`/${truePath}`)
    } else {
      history.push(`/${falsePath}`)
    }
  }

  return [pathHandle]
}
