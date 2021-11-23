import React, { useState } from "react"
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
  const [allParticipation, setAllParticipation] = useState(true)
  const [allWrite, setAllWrite] = useState(false)
  const [allLike, setAllLike] = useState(false)

  // const [wish, setWish] = useState(false)

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

  return (
    <>
      <ArrowBack bg="true">내모임</ArrowBack>

      <Container>
        <Group>
          <GroupBtn onClick={allParticipationBtn}>참여모임</GroupBtn>
          <GroupBtn onClick={allWriteBtn}>작성모임</GroupBtn>
          <GroupBtn onClick={allLikeBtn}>찜한모임</GroupBtn>
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
  :focus {
    border-bottom: 2px solid;
    font-weight: bold;
    color: red;
  }
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
