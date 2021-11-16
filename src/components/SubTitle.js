import React, { useState } from "react"
import styled from "styled-components"
import ETC from "../shared/icon/Etc.png"
import { Text } from "./index"

export const SubTitle = ({
  setShowModal,
  filter,
  sort,
  children,
  more,
  moreBtn,
}) => {
  const [sortDate, setSortDate] = useState(false)
  const [sortItem, setSortItem] = useState(false)

  const DateList = () => {
    setSortDate(!sortDate)
    setSortItem(false)
  }

  // 인기순
  const HotList = () => {
    setSortItem(!sortItem)
    setSortDate(false)
  }

  if (filter) {
    return (
      <MoreContainer>
        <Text size="16px" bold>
          {children}
        </Text>
        <IconBox onClick={() => setShowModal(true)}>
          <IconText>필터</IconText>
          <Icons src={ETC} alt="필터 이미지" />
        </IconBox>
      </MoreContainer>
    )
  }

  if (sort) {
    return (
      <MoreContainer>
        <Text size="16px" bold>
          {children}
        </Text>
        <BtnGroup>
          <SortBtn onClick={HotList}>
            <Text color={sortItem ? "#498C9A" : "#C4C4C4"}>인기순</Text>
          </SortBtn>
          <SortBtn onClick={DateList}>
            <Text color={sortDate ? "#498C9A" : "#C4C4C4"}>최신순</Text>
          </SortBtn>
        </BtnGroup>
      </MoreContainer>
    )
  }

  if (more) {
    return (
      <MoreContainer>
        <Text size="16px" bold>
          {children}
        </Text>
        <MoreBtn onClick={moreBtn}>+ More</MoreBtn>
      </MoreContainer>
    )
  }

  // more 추가 해야함

  return null
}

SubTitle.defaultProps = {
  filter: false,
  sort: false,
  more: false,
}

const IconBox = styled.div`
  display: flex;
  cursor: pointer;
`
const IconText = styled.p`
  font-size: 13px;
  color: #c4c4c4;
  margin-right: 5px;
`

const Icons = styled.img`
  width: 13px;
  height: 13px;
`

const MoreContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0 0;
`

const BtnGroup = styled.div``

const SortBtn = styled.button`
  margin-left: 10px;
  cursor: pointer;
  color: #498c9a;
  border: none;
  background-color: transparent;
`
const MoreBtn = styled.button`
  font-size: 12px;
  color: #c4c4c4;
  background: transparent;
  border: none;
  cursor: pointer;
`
