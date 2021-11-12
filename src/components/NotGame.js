import React from "react"
import styled from "styled-components"
import { GiBaseballGlove } from "react-icons/gi"

export const NotGame = (props) => {
  return (
    <NotGames>
      <GiBaseballGlove size="32px" color="#3c1010" />
      {props.children}
    </NotGames>
  )
}

NotGame.defaultProps = {
  children: null,
}

const NotGames = styled.div`
  margin: 0 auto;
  width: 300px;
  height: 500px;
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  line-height: 2;
  text-align: center;
`
