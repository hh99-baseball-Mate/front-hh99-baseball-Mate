import React, { useState } from "react"
import styled from "styled-components"
import { ArrowBack, Container, NaviBar, MarginBottom } from "../components"
import { PartiGroup } from "../componentsMygroup/PartiGroup"
import { WriteGroup } from "../componentsMygroup/WriteGroup"
import { SubTitle } from "../components/SubTitle"

const MyGroup = (props) => {
  //모달
  const [showModal, setShowModal] = useState(false)

  //구분
  const [allParticipation, setAllParticipation] = useState(true)
  const [allWrite, setAllWrite] = useState(false)

  // const [wish, setWish] = useState(false)

  // 참가 모든 모임 버튼
  const allParticipationBtn = () => {
    setAllParticipation(true)
    setAllWrite(false)
  }

  // 작성 모든 모임 버튼
  const allWriteBtn = () => {
    setAllWrite(true)
    setAllParticipation(false)
  }

  return (
    <>
      <ArrowBack bg="true">내모임</ArrowBack>

      <Container>
        <Group>
          <GroupBtn onClick={allParticipationBtn}>참여모임</GroupBtn>

          <GroupBtn onClick={allWriteBtn}>작성모임</GroupBtn>
          <GroupBtn
            onClick={() => {
              window.alert("준비중")
            }}
          >
            찜한모임
          </GroupBtn>
        </Group>

        <SubTitle filter setShowModal={setShowModal}>
          내가 지금{" "}
          {allParticipation ? <Span>참여한</Span> : <Span>작성한</Span>} 모임
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
