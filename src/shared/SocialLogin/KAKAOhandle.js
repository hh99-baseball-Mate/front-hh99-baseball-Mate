import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Loader } from "../../components/common/"
import { actionCreators as userActions } from "../../redux/modules/user"

export const KAKAOhandle = (props) => {
  const dispatch = useDispatch()

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code")

  useEffect(() => {
    if (code) {
      return dispatch(userActions.kakaoLogin(code))
    }
  }, [code])

  return (
    <>
      <Loader />
    </>
  )
}

