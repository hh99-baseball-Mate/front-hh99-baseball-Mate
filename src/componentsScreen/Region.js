import React from "react"
import styled from "styled-components"
import { AiOutlineClose } from "react-icons/ai"
import { Text } from "../components"
import { RegionList } from "../components/RegionList"

export const Region = ({ setShowModal }) => {
  return (
    <Container>
      {/* 닫기버튼 */}
      <CloseBtn onClick={() => setShowModal(false)}>
        <AiOutlineClose size="24px" />
      </CloseBtn>

      <Text margin="12px 5px 12px">지역</Text>
      <RegionList></RegionList>
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  margin: 20px;
`
const CloseBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`
