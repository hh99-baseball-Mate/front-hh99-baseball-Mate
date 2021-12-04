import React, { memo } from "react"
import styled from "styled-components"
import { AiOutlineClose } from "react-icons/ai"
import { Text } from "../element"
import { RegionList } from "../../components/common"

export const Region = memo(({ setShowModal, setRegoin }) => {
  // 지역 필터
  return (
    <Container>
      {/* 닫기버튼 */}
      <CloseBtn onClick={() => setShowModal(false)}>
        <AiOutlineClose size="24px" />
      </CloseBtn>

      <Text margin="12px 5px 12px">지역</Text>
      <RegionList
        setRegoin={setRegoin}
        setShowModal={setShowModal}
      ></RegionList>
    </Container>
  )
})

const Container = styled.div`
  height: 100%;
  margin: 20px;
`
const CloseBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`
