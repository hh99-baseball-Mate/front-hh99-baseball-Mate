import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { actionCreators as withActions } from "../redux/modules/with"
import GroupCard from "../components/GroupCard"
import { Container } from "../components"
// import { NotGame } from "../components/NotGame"
import styled from "styled-components"
import { Modal } from "../components/Modal"
import Reciangle from "../shared/icon/Rectangle.png"
import { useMygroupBtn } from "../customHook/useMygroupBtn"
import { history } from "../redux/configStore"

export const WriteGroup = ({ showModal, setShowModal }) => {
  const dispatch = useDispatch()

  // 작성 모임 리스트
  const write_list = useSelector((state) => state.with.write_list)

  // 스크린 모임 리스트
  const screen_write = useSelector((state) => state.with.scrwrite_list)

  // 전체모임은 작성모임리스트에 스크린 리스트를 붙여서 사용
  const all_list = write_list.concat(screen_write)

  // 커스텀 훅 myGroupModalBtn
  const [allListBtn, partiBtn, writeBtn, allList, game, screen] =
    useMygroupBtn(setShowModal)

  useEffect(() => {
    // 직관 / 스크린 야구 모임을 위해 두개를 모두 호출
    dispatch(withActions.getWriteAPI())
    dispatch(withActions.getScreenWriteAPI())
  }, [])

  return (
    <>
      {/* 상세보기 필터 모달 */}
      {showModal ? (
        <Modal bottom btnConfirm height="244px" setShowModal={setShowModal}>
          <Cen>
            <img src={Reciangle} alt="등등" />
            <But onClick={allListBtn}>전체보기</But>
            <But onClick={partiBtn}>경기 모임만</But>
            <But onClick={writeBtn}>스야 모임만</But>
          </Cen>
        </Modal>
      ) : (
        ""
      )}

      <Container>
        {/* key 값으로 넣을 id가 screenId와 groupId 으로 변수명이 각자 달라 임시로 idx로 하였음 */}
        {allList && all_list && all_list.length > 0
          ? all_list.map((e, idx) => (
              <GroupCard
                onClick={() => {
                  if (e.groupId) {
                    history.push(`/groupdetail/${e.groupId}`)
                  }
                  if (e.screenId) {
                    history.push(`/screendetail/${e.screenId}`)
                  }
                }}
                key={idx}
                {...e}
              />
            ))
          : ""}

        {/* 게임만 모임 */}
        {game && write_list && write_list.length > 0
          ? write_list.map((e) => (
              <GroupCard
                onClick={() => history.push(`/groupdetail/${e.groupId}`)}
                key={e.groupId}
                {...e}
              />
            ))
          : ""}
        {/* 스크린만 모임 */}
        {screen && screen_write && screen_write.length > 0
          ? screen_write.map((e) => (
              <GroupCard
                onClick={() => history.push(`/screendetail/${e.screenId}`)}
                key={e.screenId}
                {...e}
              />
            ))
          : ""}
      </Container>
    </>
  )
}

const But = styled.button`
  font-weight: bold;
  background: none;
  border: none;
  font-size: 14px;
  color: #777777;
  margin-top: 30px;
  cursor: pointer;
`

const Cen = styled.div`
  text-align: center;
  width: 100px;
  margin: 0 auto;
  color: #777777;
  font-size: "14px";
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`
