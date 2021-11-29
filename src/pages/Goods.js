import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Header, MarginBottom, NaviBar } from "../components"
import { Post } from "../componentsGoods/Post"
import { history } from "../redux/configStore"
import { actionCreators as goodsActions } from "../redux/modules/goods"
import { NotGame } from "../components/NotGame"
import { InfinityScroll } from "../components/InfinityScroll"
import { Helmet } from "react-helmet"
export const Goods = () => {
  const dispatch = useDispatch()

  // 무한스크롤
  const [infinity, setInfinity] = useState({
    start: 0,
    next: 2,
  })

  // 댓글 작성시 유저정보를 기입하기 위해 불러옴
  const user_info = useSelector((state) => state.user.user_info)
  const is_login = useSelector((state) => state.user.is_login)

  // 무한스크롤
  const goods_list = useSelector((state) => state.goods.goods_list)
  const is_loading = useSelector((state) => state.goods.is_loading)
  const list_length = useSelector((state) => state.goods.list_length)

  const AddBtn = (e) => {
    !is_login
      ? window.alert("로그인 후 이용해주세요")
      : history.push("/goods/goodsadd")
    e.target.disabled = true
  }

  useEffect(() => {
    dispatch(goodsActions.getGoodsMD(infinity))
  }, [infinity])

  return (
    <>
      <Helmet>
        <title> 미트볼</title>
        <meta property="og:title" content="미트볼 || 경기모임" />
        <meta property="og:description" content="우리 같이 직관가자!" />
      </Helmet>
      <Header goods />

      {/* 무한스크롤 컴포넌트 */}
      <InfinityScroll
        callNext={() => {
          setInfinity({
            start: infinity.start,
            next: (infinity.next += 2),
          })
        }}
        is_next={list_length > infinity.next}
        loading={is_loading}
      >
        {goods_list && goods_list.length > 0 ? (
          goods_list.map((e) => {
            return (
              <Post
                key={e.goodsId}
                {...e}
                user_info={user_info}
                is_login={is_login}
              />
            )
          })
        ) : (
          <NotGame>
            등록 된 굿즈가 없습니다
            <br /> 굿즈를 등록해주세요
          </NotGame>
        )}
      </InfinityScroll>

      <MarginBottom />
      <NaviBar writeBtn onClick={AddBtn} />
    </>
  )
}
