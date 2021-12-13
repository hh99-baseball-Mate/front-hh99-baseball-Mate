import React, { useState } from "react"
import styled from "styled-components"
import ETC from "../../shared/icon/Etc.png"
import { Text } from "../element"

export const SubTitle = ({
  setShowModal,
  filter,
  sort,
  children,
  more,
  HotList,
  DateList,
  sortDate,
  sortItem,
}) => {
  if (filter) {
    return (
      <MoreContainer>
        <Text size="16px" bold>
          {children}
        </Text>
        <IconBox onClick={() => setShowModal(true)}>
          <IconText>상세보기</IconText>
          <Icons src={ETC} alt="등등" />
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
      <>
        <Text size="16px">{children}</Text>
      </>
    )
  }

  // more 추가 해야함

  return <OriginTitle>{children}</OriginTitle>
}

SubTitle.defaultProps = {
  filter: false,
  sort: false,
  more: false,
}

const IconBox = styled.div`
  width: 90px;
  height: 30px;
  border-radius: 30px;
  background: none;
  border: 1px solid #e7e7e7;
  font-size: 14px;
  display: flex;
  font-weight: 500;
  color: #c4c4c4;
  text-align: center;
  justify-content: center;
  align-items: center;
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

const OriginTitle = styled.div`
  padding: 0.8em 0;
`

const BtnGroup = styled.div``

const SortBtn = styled.button`
  margin-left: 10px;
  cursor: pointer;
  color: #498c9a;
  border: none;
  background-color: transparent;
`
