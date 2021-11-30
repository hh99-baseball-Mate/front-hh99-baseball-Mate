import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Container, Header, Text, NaviBar, MarginBottom } from "../components"
import { Modal } from "../components/Modal"
import { GroupCard } from "../components/GroupCard"
import { Region } from "../componentsScreen/Region"
import { history } from "../redux/configStore"
import { actionCreators as screenAction } from "../redux/modules/screen"

import { InfinityScroll } from "../components/InfinityScroll"
import { NotGame } from "../components/NotGame"
import { SubTitle } from "../components/SubTitle"
import { SelectIcon } from "../components/SelectIcon"
import { Helmet } from "react-helmet"

export const ScreenList = () => {
  const dispatch = useDispatch()

  const [infinity, setinfinity] = useState({
    start: 0,
    next: 6,
  })

  const [showModal, setShowModal] = useState(false)
  const [regoin, setRegoin] = useState("")

  const is_login = useSelector((state) => state.user.is_login)

  // 무한스크롤
  const screen_list = useSelector((state) => state.screen.screen_list)
  const is_loading = useSelector((state) => state.screen.is_loading)
  const list_length = useSelector((state) => state.screen.list_length)

  const onSubmitBtn = (e) => {
    !is_login
      ? window.alert("로그인 후 이용해주세요")
      : history.push("/screen/screenadd")
    e.target.disabled = true
  }

  useEffect(() => {
    // 필터 값을 넘겨서 겟 요청
    dispatch(screenAction.screenGetMD(regoin, infinity))
  }, [regoin, infinity])

  return (
    <>
      <Helmet>
        <title> 미트볼 || 스야모임</title>
        <meta property="og:title" content="미트볼 || 경기모임" />
        <meta property="og:description" content="우리 같이 직관가자!" />
      </Helmet>
      <InfinityScroll
        callNext={() => {
          setinfinity({
            start: infinity.start,
            next: (infinity.next += 3),
          })
        }}
        is_next={list_length > infinity.next}
        loading={is_loading}
      >
        <Header screen />

        <Container>
          {/* 서브 타이틀*/}

          <SubTitle more>같이 스야 즐겨요!</SubTitle>

          {/* 지역 선택 모달 Btn Icon */}

          <SelectIcon setShowModal={setShowModal}>
            원하는 지역을 선택해주세요!{" "}
          </SelectIcon>
          {/* 지역선택 모달 */}

          {showModal ? (
            <Modal bottom margin="0 -20px">
              <Region
                setShowModal={setShowModal}
                setRegoin={setRegoin}
              ></Region>
            </Modal>
          ) : null}

          {screen_list && screen_list.length > 0 ? (
            screen_list.map((e) => (
              <GroupCard
                onClick={() =>
                  history.push(`/screen/screendetail/${e.screenId}`)
                }
                key={e.screenId}
                {...e}
              />
            ))
          ) : (
            <NotGame>생성 된 모임이 없습니다.</NotGame>
          )}
        </Container>
        <MarginBottom />
        <NaviBar writeBtn onClick={onSubmitBtn} />
      </InfinityScroll>
    </>
  )
}