import React from "react"
import styled from "styled-components"
import { GiBaseballGlove } from "react-icons/gi"

export const NotGame = (props) => {
  return (
    <NotGames width={props.width}>
      <GiBaseballGlove size="32px" color="#3c1010" />
      {props.children}
    </NotGames>
  )
}

NotGame.defaultProps = {
  children: null,
  width: "300px",
}

const NotGames = styled.div`
  margin: 0 auto;
  width: ${(props) => props.width};
  height: 500px;
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  line-height: 2;
  text-align: center;
`
