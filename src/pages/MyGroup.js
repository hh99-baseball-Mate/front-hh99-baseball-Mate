import React, { useCallback, useRef, useState } from "react"
import styled from "styled-components"
import { ArrowBack, Container, NaviBar, MarginBottom } from "../components"
import { PartiGroup } from "../componentsMygroup/PartiGroup"
import { WriteGroup } from "../componentsMygroup/WriteGroup"
import { LikeGroup } from "../componentsMygroup/LikeGroup"
import { SubTitle } from "../components/SubTitle"

const MyGroup = (props) => {
  //모달
  const [showModal, setShowModal] = useState(false)

  //구분
  const [allParticipation, setAllParticipation] = useState(false)
  const [allWrite, setAllWrite] = useState(false)
  const [allLike, setAllLike] = useState(false)

  // css 입히기 위해서 useRef 를 씀
  const partiBtnRef = useRef()
  const wirteBtnRef = useRef()
  const LikeBtnRef = useRef()

  // 참가 모든 모임 버튼
  const allParticipationBtn = () => {
    setAllParticipation(true)
    setAllWrite(false)
    setAllLike(false)
  }

  // 작성 모든 모임 버튼
  const allWriteBtn = () => {
    setAllWrite(true)
    setAllParticipation(false)
    setAllLike(false)
  }

  // 찜한모임
  const allLikeBtn = () => {
    setAllLike(true)
    setAllParticipation(false)
    setAllWrite(false)
  }

  // useRef 를 통해서 css 제어 (참가모임, 작성모임, 찜한모임 선택 시 css 변경)

  // useCallback 사용해보기

  if (partiBtnRef.current && allParticipation) {
    partiBtnRef.current.style =
      "border-bottom: 2px solid;font-weight: bold;color: red;"
  } else if (partiBtnRef.current) {
    partiBtnRef.current.style = null
  }
  if (wirteBtnRef.current && allWrite) {
    wirteBtnRef.current.style =
      "border-bottom: 2px solid;font-weight: bold;color: red;"
  } else if (wirteBtnRef.current) {
    wirteBtnRef.current.style = null
  }

  if (LikeBtnRef.current && allLike) {
    LikeBtnRef.current.style =
      "border-bottom: 2px solid;font-weight: bold;color: red;"
  } else if (LikeBtnRef.current) {
    LikeBtnRef.current.style = null
  }

  return (
    <>
      <ArrowBack bg="true">내모임</ArrowBack>

      <Container>
        <Group>
          <GroupBtn ref={partiBtnRef} onClick={allParticipationBtn}>
            참여모임
          </GroupBtn>
          <GroupBtn ref={wirteBtnRef} onClick={allWriteBtn}>
            작성모임
          </GroupBtn>
          <GroupBtn ref={LikeBtnRef} onClick={allLikeBtn}>
            찜한모임
          </GroupBtn>
        </Group>

        <SubTitle filter setShowModal={setShowModal}>
          나의 모임
        </SubTitle>
      </Container>

      {/* 카드 */}

      {/* 참가모임 */}
      {allParticipation && (
        <PartiGroup showModal={showModal} setShowModal={setShowModal} />
      )}

      {/* 작성모임 */}
      {allWrite && (
        <WriteGroup showModal={showModal} setShowModal={setShowModal} />
      )}

      {allLike && (
        <LikeGroup showModal={showModal} setShowModal={setShowModal} />
      )}

      <MarginBottom />
      <NaviBar sch />
    </>
  )
}

export default MyGroup

const GroupBtn = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  margin-right: 0;
  padding-bottom: 10px;
  color: #777777;
  /* :focus,
  :active {
    border-bottom: 2px solid;
    font-weight: bold;
    color: red;
  } */
`
const Group = styled.div`
  display: flex;
  justify-content: space-around;
  /* text-align: center; */
  padding: 20px 20px;
  border-bottom: 2px solid #e7e7e7;
  background-color: none;
  vertical-align: "middle";
`
const Span = styled.span`
  color: blue;
`
