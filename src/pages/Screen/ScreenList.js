import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Container,
  Header,
  NaviBar,
  MarginBottom,
  Modal,
  InfinityScroll,
  NotGame,
  SubTitle,
  SelectIcon,
  GroupCard,
} from "../../components/common/"
import { Region } from "../../components/screen/"
import { history } from "../../redux/configStore"
import { actionCreators as screenAction } from "../../redux/modules/screen"

export const ScreenList = (props) => {
  const dispatch = useDispatch()

  const [infinity, setinfinity] = useState({
    start: 0,
    next: 6,
  })

  const [showModal, setShowModal] = useState(false)
  // 지역 담을 state
  const [regoin, setRegoin] = useState("")

  const is_login = useSelector((state) => state.user.is_login)

  // 무한스크롤
  // 리스트 총 길이만큼 스크롤 이벤트하기 위해 list_length를 가져옴
  const screen_list = useSelector((state) => state.screen.screen_list)
  const list_length = useSelector((state) => state.screen.list_length)
  const is_loading = useSelector((state) => state.screen.is_loading)

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
            원하는 지역을 선택해주세요!
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
                path="screen"
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
