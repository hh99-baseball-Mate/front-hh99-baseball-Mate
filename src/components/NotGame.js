import React from "react"
import styled from "styled-components"
import { GiBaseballGlove } from "react-icons/gi"

export const NotGame = () => {
  return (
    <NotGames>
      <GiBaseballGlove size="32px" color="#3c1010" />
      생성된 모임이 없습니다.
      <br /> 모임을 만들어주세요!
    </NotGames>
  )
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
