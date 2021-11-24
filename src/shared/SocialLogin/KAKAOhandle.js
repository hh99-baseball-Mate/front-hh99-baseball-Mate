import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Loading } from "../../components/Loading"
import { actionCreators as userActions } from "../../redux/modules/user"

const KAKAOhandle = (props) => {
  const dispatch = useDispatch()

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code")

  // console.log(code)
  useEffect(() => {
    console.log("야되냐?")
    dispatch(userActions.kakaoLogin(code))
  }, [])

  return (
    <>
      <Loading />
    </>
  )
}

export default KAKAOhandle
