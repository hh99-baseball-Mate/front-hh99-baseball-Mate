import React from "react"
import { Text } from "../element"
import { AiOutlineDoubleRight } from "react-icons/ai"
import styled from "styled-components"

export const TextLine = (props) => {
  const { children, onClick } = props
  const styles = { onClick }

  return (
    <TextBox {...styles}>
      <Text margin="0px 20px 0">{children}</Text>
      <Icons />
    </TextBox>
  )
}

const Icons = styled(AiOutlineDoubleRight)`
  position: absolute;
  right: 20px;
  color: 777;
`
const TextBox = styled.div`
  position: relative;
  padding: 20px 0;
  display: flex;
  border-bottom: 1px solid #e7e7e7;
  cursor: pointer;
`
