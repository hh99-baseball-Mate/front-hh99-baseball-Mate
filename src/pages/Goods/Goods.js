import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Header,
  MarginBottom,
  NaviBar,
  NotGame,
  InfinityScroll,
} from "../../components/common/"
import { useLoginCheck } from "../../components/customHook"
import { Post } from "../../components/goods/Post"
import { history } from "../../redux/configStore"
import { actionCreators as goodsActions } from "../../redux/modules/goods"

const Goods = () => {
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

  const [pathHandle] = useLoginCheck()

  useEffect(() => {
    dispatch(goodsActions.getGoodsMD(infinity))
  }, [infinity])

  return (
    <>
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
      <NaviBar writeBtn onClick={() => pathHandle("login", "goods/goodsadd")} />
    </>
  )
}

export default Goods
