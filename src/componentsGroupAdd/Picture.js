import React from "react"
import { Text } from "../components"
import { AiOutlineCamera } from "react-icons/ai"
import styled from "styled-components"

export const Picture = (props) => {
  const { children, basic } = props

  if (basic) {
    return (
      <ContainerBox>
        <div style={{ display: "block" }}>
          <AiOutlineCamera size="34px" color="#777777" />
          <Text color="#777777">1 / 5</Text>
        </div>
      </ContainerBox>
    )
  }

  return <ContainerBox>{children}</ContainerBox>
}

Picture.defaultProps = {
  children: null,
  basic: false,
}

const ContainerBox = styled.div`
  width: 82px;
  height: 88px;
  border: 1px solid #e7e7e7;
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`
