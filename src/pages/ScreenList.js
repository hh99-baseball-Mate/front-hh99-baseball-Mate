import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { Container, Header, Text, NaviBar, MarginBottom } from "../components"
import { Banner } from "../components/Banner"
import { Modal } from "../components/Modal"
import GroupCard from "../componentsScreen/GroupCard"
import { Region } from "../componentsScreen/Region"
import { history } from "../redux/configStore"
import { actionCreators as screenAction } from "../redux/modules/screen"
import ETC from "../shared/icon/Etc.png"

import { InfinityScroll } from "../components/InfinityScroll"
import { NotGame } from "../components/NotGame"

export const ScreenList = () => {
  const dispatch = useDispatch()

  const [infinity, setinfinity] = useState({
    start: 0,
    next: 4,
  })

  const [showModal, setShowModal] = useState(false)
  const [regoin, setRegoin] = useState("")

  const is_login = useSelector((state) => state.user.is_login)

  const screen_list = useSelector((state) => state.screen.screen_list)
  const is_loading = useSelector((state) => state.screen.is_loading)
  const list_length = useSelector((state) => state.screen.list_length)

  // console.log(is_loading)
  const onSubmitBtn = (e) => {
    !is_login
      ? window.alert("로그인 후 이용해주세요")
      : history.push("/screen/screenadd")
    e.target.disabled = true
  }

  useEffect(() => {
    // 필터 값을 넘겨서 겟 요청
    dispatch(screenAction.screenGetMD(regoin, infinity))

    // console.log("디스패치횟수")
  }, [regoin, infinity])

  return (
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
      <Header nowBtnSB />
      <Banner />
      <Container>
        {/* 리스트 바 */}
        <ListBar>
          <Text size="16px" bold>
            모임 목록
          </Text>
          <IconBox onClick={() => setShowModal(true)}>
            <IconText>필터</IconText>
            <Icons src={ETC} alt="필터 이미지" />
          </IconBox>

          {showModal ? (
            <Modal bottom margin="0 -20px">
              <Region
                setShowModal={setShowModal}
                setRegoin={setRegoin}
              ></Region>
            </Modal>
          ) : null}
        </ListBar>

        {screen_list && screen_list.length > 0 ? (
          screen_list.map((e) => <GroupCard key={e.screenId} screen_list={e} />)
        ) : (
          <NotGame>
            생성된 모임이 없습니다 <br />
            모임을 생성해주세요!
          </NotGame>
        )}
      </Container>
      <MarginBottom />
      <NaviBar writeBtn onClick={onSubmitBtn} />
    </InfinityScroll>
  )
}

const ListBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
`

const IconBox = styled.div`
  display: flex;
  cursor: pointer;
`
const IconText = styled.p`
  font-size: 13px;
  color: #c4c4c4;
  margin-right: 5px;
`

const Icons = styled.img`
  width: 13px;
  height: 13px;
`