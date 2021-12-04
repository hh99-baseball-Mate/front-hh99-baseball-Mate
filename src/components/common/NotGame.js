import React from "react"
import styled from "styled-components"
import { GiBaseballGlove } from "react-icons/gi"

export const NotGame = (props) => {
  // 게시글 목록이 없을 경우 보여주는 빈 페이지 안내
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
  min-height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  line-height: 2;
  text-align: center;
`
