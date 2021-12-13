import React from "react"
import { useSelector } from "react-redux"
import { history } from "../../redux/configStore"

export const useLoginCheck = () => {
  const is_login = useSelector((state) => state.user.is_login)

  const pathHandle = (truePath, falsePath) => {
    if (!is_login) {
      const confrim = window.confirm(
        "로그인 이후 사용 할 수 있습니다. 로그인 화면으로 가시겠습니까?"
      )
      if (confrim) {
        history.push(`/login`)
        return
      }
    }
  }

  return [pathHandle]
}
