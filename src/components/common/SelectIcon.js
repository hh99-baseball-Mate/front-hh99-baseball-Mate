import React from "react"
import styled from "styled-components"
import { Text } from "../element"
import { BiMapAlt } from "react-icons/bi"
import enlargements from "../../shared/icon/enlargement.png"

export const SelectIcon = ({
  children,
  setShowModal,
  enlargement,
  moreBtn,
  margin,
}) => {
  // 음영 필터창 ex) 원하는 지역을 선택해주세요
  if (enlargement) {
    return (
      <Container margin={margin} onClick={moreBtn}>
        <Text center margin="14px" color="#C4C4C4">
          {children}
        </Text>
        <ImgBox>
          <Img src={enlargements} alt="돋보기" />
        </ImgBox>
      </Container>
    )
  }
  return (
    <Container margin={margin} onClick={() => setShowModal(true)}>
      <Text center margin="14px" color="#C4C4C4">
        {children}
      </Text>
      <Icon size="23" color="#777777" />
    </Container>
  )
}

SelectIcon.defaultProps = {
  children: null,
  enlargement: false,
}

const Container = styled.div`
  margin: ${(props) => props.margin};
  width: 100%;
  height: 45px;
  background: #f3f3f3;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
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
