<<<<<<< HEAD
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
=======
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
>>>>>>> master
import { Header, MarginBottom, NaviBar } from "../components"
import { Post } from "../componentsGoods/Post"
import { history } from "../redux/configStore"
import { actionCreators as goodsActions } from "../redux/modules/goods"
import { NotGame } from "../components/NotGame"
import { InfinityScroll } from "../components/InfinityScroll"
export const Goods = () => {
  const dispatch = useDispatch()

  // 무한스크롤
  const [infinity, setInfinity] = useState({
    start: 0,
    next: 2,
  })
  const user_info = useSelector((state) => state.user.user_info)

  // 무한스크롤
  const goods_list = useSelector((state) => state.goods.goods_list)
  const is_loading = useSelector((state) => state.goods.is_loading)
  const list_length = useSelector((state) => state.goods.list_length)

  console.log(is_loading, list_length)

  // console.log(user_info, goods_list)

  useEffect(() => {
    dispatch(goodsActions.getGoodsMD(infinity))
    dispatch(goodsActions.getGoodsCommentMD(user_info.goodsId))
  }, [infinity])
  return (
    <>
      <Header goods />

      {/* 무한스크롤 컴포넌트 */}
      <InfinityScroll
        callNext={() => {
          console.log("되는중?")
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
            return <Post key={e.goodsId} {...e} {...user_info} />
          })
        ) : (
          <NotGame>
            등록 된 굿즈가 없습니다
            <br /> 굿즈를 등록해주세요
          </NotGame>
        )}
      </InfinityScroll>

<<<<<<< HEAD
      <MarginBottom/>
      <NaviBar writeBtn />
=======
      <MarginBottom />
      <NaviBar writeBtn onClick={() => history.push("/goods/goodsadd")} />
>>>>>>> master
    </>
  )
}
