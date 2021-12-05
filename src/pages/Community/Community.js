import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { CommunityCard } from "../../components/community/CommunityCard"
import {
  Container,
  Header,
  InfinityScroll,
  MarginBottom,
  NaviBar,
} from "../../components/common"
import { Text } from "../../components/element"
import { history } from "../../redux/configStore"
import { actionCreators as actionCr } from "../../redux/modules/community"
import eventBanner from "../../shared/icon/logo/timeLineBanner.png"

const Community = (props) => {
  const dispatch = useDispatch()
  //무한 스크롤
  const [infinity, setInfinity] = useState({
    start: 0,
    next: 4,
  })

  //무한 스크롤
  //카드 조회
  const card_list = useSelector((state) => state.community.card_list)
  const is_loading = useSelector((state) => state.community.is_loading)
  const card_list_length = useSelector(
    (state) => state.community.card_list_length
  )

  // 유저 정보
  const is_login = useSelector((state) => state.user.is_login)
  //로그인 조회구별
  const newPeople = (e) => {
    !is_login
      ? window.alert("로그인 후 이용해주세요")
      : history.push("/community/communityadd")
    e.target.disabled = true
  }

  //카드 조회
  useEffect(() => {
    dispatch(actionCr.getCardAPI(infinity))
  }, [infinity])

  return (
    <>
      <Header community />
      <Banner src={eventBanner} alt="" />
      <Container MainContainer>
        <Text bold size="16px">
          우리 같이 이야기 해봐요!
        </Text>
        {/* 무한스크롤 컴포넌트 */}
        <InfinityScroll
          callNext={() => {
            setInfinity({
              start: infinity.start,
              next: (infinity.next += 2),
            })
          }}
          is_next={card_list_length > infinity.next}
          loading={is_loading}
        >
          {card_list.map((e) => {
            return <CommunityCard key={e.communityId} {...e} />
          })}
        </InfinityScroll>
      </Container>
      <MarginBottom />
      <NaviBar home writeBtn onClick={newPeople} />
    </>
  )
}

export default Community

const Banner = styled.img`
  width: 100%;
`
