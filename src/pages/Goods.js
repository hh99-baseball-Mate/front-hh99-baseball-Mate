import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { Header, NaviBar } from "../components"
import { Post } from "../componentsGoods/Post"
import styled from "styled-components"

export const Goods = () => {
  const user_info = useSelector((state) => state.user.user_info)
  console.log(user_info)

  useEffect(() => {}, [])
  return (
    <>
      <Header />

      <Post />
      <Post />
      <Post />
      <Post />

      <NaviBar writeBtn />
    </>
  )
}
