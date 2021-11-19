import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Container, Header, Text, MarginBottom, NaviBar } from "../components"
import { Card } from "../componentsGoods/Card"
import { useDispatch, useSelector } from "react-redux"
import { actionCreators as goodsActions } from "../redux/modules/goods"
import { history } from "../redux/configStore"
import { SubTitle } from "../components/SubTitle"
import { InfinityScroll } from "../components/InfinityScroll"
import { NotGame } from "../components/NotGame"

export const GoodsList = () => {
  const dispatch = useDispatch()

  const [infinity, setInfinity] = useState({
    start: 0,
    next: 6,
  })

  const goods_list = useSelector((state) => state.goods.goods_list)
  const is_loading = useSelector((state) => state.goods.is_loading)
  const list_length = useSelector((state) => state.goods.list_length)

  // console.log(goods_list, "굿즈 목록")
  // console.log(list_length, "list_length")

  useEffect(() => {
    // window.alert("준비 중입니다.")
    dispatch(goodsActions.getGoodsMD(infinity))
  }, [infinity])

  return (
    <InfinityScroll
      callNext={() => {
        // console.log("되냐?")
        setInfinity({
          start: infinity.start,
          next: (infinity.next += 4),
        })
      }}
      is_next={list_length > infinity.next}
      loading={is_loading}
    >
      <Header goods />

      <Container>
        {/* 서브타이틀 */}
        <SubTitle sort>굿즈 목록</SubTitle>

        {/* 굿즈 카드 */}

        <CardContainer>
          {goods_list && goods_list.length > 0 ? (
            goods_list.map((e) => {
              // console.log(e)
              return <Card key={e.goodsId} {...e} />
            })
          ) : (
            <NotGame width="400px">등록 된 굿즈가 없습니다.</NotGame>
          )}
        </CardContainer>
        {/* </Position> */}
      </Container>

      <MarginBottom />
      <NaviBar writeBtn onClick={() => history.push("/goods/goodsadd")} />
    </InfinityScroll>
  )
}

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin: 20px 0;
`
