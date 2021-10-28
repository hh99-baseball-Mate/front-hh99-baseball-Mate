import React from "react"
import styled from "styled-components"

export const Container = (props) => {
  const { children } = props

  return <MainContainer>{children}</MainContainer>
}

Container.defaultProp = {
  children: null,
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 30px auto;
  max-width: 335px;
`
