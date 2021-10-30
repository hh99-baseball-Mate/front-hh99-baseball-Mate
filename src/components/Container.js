import React from "react"
import styled from "styled-components"

export const Container = (props) => {
  const { children, margin } = props
  const styles = { margin }

  return <MainContainer {...styles}>{children}</MainContainer>
}

Container.defaultPorps = {
  children: null,
  margin: "0px auto",
}

const MainContainer = styled.div`
  margin: ${(props) => props.margin};
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 335px;
`
