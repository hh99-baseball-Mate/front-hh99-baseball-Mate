import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCookie } from "../../shared/common/Cookie"
import { actionCreators as userActions } from "../../redux/modules/user"

export const useIsLogin = () => {
  const dispatch = useDispatch()

  const is_loaded = useSelector((state) => state.user.is_loaded)
  const is_login = useSelector((state) => state.user.is_login)

  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    if (getCookie("is_login")) {
      setIsLogin(true)
      dispatch(userActions.logInCheckMD())
    }
  }, [])

  return [is_login, is_loaded]
}
