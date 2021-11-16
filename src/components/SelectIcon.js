import React from "react"
import styled from "styled-components"
import { Text } from "./"
import { BiMapAlt } from "react-icons/bi"
import enlargement from "../shared/icon/enlargement.png"

export const SelectIcon = ({
  children,
  setShowModal,
  enlargement,
  moreBtn,
}) => {
  if (enlargement) {
    return (
      <Container onClick={moreBtn}>
        <Text center margin="14px" color="#C4C4C4">
          {children}
        </Text>
        <ImgBox>
          <Img src={enlargement} alt="돋보기" />
        </ImgBox>
      </Container>
    )
  }
  return (
    <Container onClick={() => setShowModal(true)}>
      <Text center margin="14px" color="#C4C4C4">
        {children}
      </Text>
      <Icon size="23" color="#777777" />
    </Container>
  )
}

SelectIcon.defaultProps = {
  children: null,
  enlargement,
}

const Container = styled.div`
  margin: 20px 0px;
  width: 100%;
  height: 45px;
  background: #f3f3f3;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
`
const Icon = styled(BiMapAlt)`
  margin: 12px;
  cursor: pointer;
`

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
`

const Img = styled.img`
  width: 20px;
  height: 20px;
`
