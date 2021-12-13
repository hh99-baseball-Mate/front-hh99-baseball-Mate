import React from "react"
import styled from "styled-components"
import { SubTitle } from "../common"

const SubText = (props) => {
  return (
    <SubTitle>
      <Title>{props.title}</Title>
      <Desc>{props.desc}</Desc>
    </SubTitle>
  )
}

export default SubText

const Title = styled.p`
  font-size: 15px;
  font-weight: 500;
`

const Desc = styled.p`
  margin: 5px 0;
  font-size: 12px;
  color: #7d7575;
`
