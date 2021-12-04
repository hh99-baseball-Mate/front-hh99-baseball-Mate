import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { actionCreators as withActions } from "../../redux/modules/with"
import styled from "styled-components"
import { Container, Modal, GroupCard } from "../../components/common"
import Reciangle from "../../shared/icon/Rectangle.png"
import { useMygroupBtn } from "../../components/customHook/"
import { history } from "../../redux/configStore"

export const LikeGroup = ({ showModal, setShowModal }) => {
  const dispatch = useDispatch()

  // 직관 참가모임 리스트
  const group_like_list = useSelector((state) => state.with.group_like_list)

  // 스크린 야구 참고모임 리스트
  const screen_like_list = useSelector((state) => state.with.screen_like_list)

  // concat 으로 하나로 합쳐서 all_list를 새로 만듦
  const all_list = group_like_list.concat(screen_like_list)

  // 커스텀 훅 myGroupModalBtn
  const [allListBtn, partiBtn, writeBtn, allList, game, screen] =
    useMygroupBtn(setShowModal)

  useEffect(() => {
    // 직관 / 스크린 야구 모임을 위해 두개를 모두 호출
    dispatch(withActions.getLikeAPi())
    dispatch(withActions.getScreenLikeAPI())
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
        {
          allList && all_list && all_list.length > 0
            ? all_list.map((e, idx) => (
                <GroupCard
                  onClick={() => {
                    if (e.groupId) {
                      history.push(`/groupdetail/${e.groupId}`)
                    }
                    if (e.screenId) {
                      history.push(`/screen/screendetail/${e.screenId}`)
                    }
                  }}
                  key={idx}
                  {...e}
                />
              ))
            : ""
          // <NotGame>경기가 없습니다.</NotGame>
        }

        {/* 경기만 모임 */}
        {
          game && group_like_list && group_like_list.length > 0
            ? group_like_list.map((e) => (
                <GroupCard
                  onClick={() => history.push(`/groupdetail/${e.groupId}`)}
                  key={e.groupId}
                  {...e}
                />
              ))
            : ""
          // <NotGame>경기가 없습니다.</NotGame>
        }

        {/* 스크린만 모임 */}
        {
          screen && screen_like_list && screen_like_list.length > 0
            ? screen_like_list.map((e) => (
                <GroupCard
                  onClick={() =>
                    history.push(`/screen/screendetail/${e.screenId}`)
                  }
                  key={e.screenId}
                  {...e}
                />
              ))
            : ""
          // <NotGame>경기가 없습니다.</NotGame>
        }
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
