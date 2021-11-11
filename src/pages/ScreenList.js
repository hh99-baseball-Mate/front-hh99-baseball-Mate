import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import {
  Container,
  Header,
  PancilBtn,
  Text,
  NaviBar,
  MarginBottom,
} from "../components"
import { Banner } from "../components/Banner"
import { Modal } from "../components/Modal"
import GroupCard from "../componentsScreen/GroupCard"
import { Region } from "../componentsScreen/Region"
import { history } from "../redux/configStore"
import { actionCreators as screenAction } from "../redux/modules/screen"
import ETC from "../shared/icon/Etc.png"

export const ScreenList = () => {
  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false)
  const [regoin, setRegoin] = useState("")

  console.log(regoin)
  const screen_list = useSelector((state) => state.screen.screen_list)

  useEffect(() => {
    dispatch(screenAction.screenGetMD(regoin))

    console.log("디스패치횟수")
  }, [regoin])

  return (
    <>
      <Header nowBtnSB />
      <Banner bg="#e7e7e7">배너</Banner>
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
            <Modal bottom height="335px">
              <Region
                setShowModal={setShowModal}
                setRegoin={setRegoin}
              ></Region>
            </Modal>
          ) : null}
        </ListBar>

        {screen_list && screen_list.length > 0
          ? screen_list.map((e) => (
              <GroupCard key={e.screenId} screen_list={e} />
            ))
          : ""}

        <PancilBtn
          onClick={() => {
            history.push("/screen/screenadd")
          }}
        />
      </Container>
      <MarginBottom />
      <NaviBar />
    </>
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
