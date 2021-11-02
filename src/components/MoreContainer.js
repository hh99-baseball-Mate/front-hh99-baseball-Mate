import React from "react"
import styled from "styled-components"

export const MoreContainer = (props) => {
  return <Container>{props.children}</Container>
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0 15px;
`
