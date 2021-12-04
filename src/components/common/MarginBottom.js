import React from "react"
import styled from "styled-components"

export const MarginBottom = (props) => {
  const { chat } = props

  return <Box chat={chat}></Box>
}

MarginBottom.defaultProps = {
  chat: false,
}

const Box = styled.div`
  width: 0;
  height: 0;
  ${(props) =>
    props.chat
      ? "margin-bottom: 74px;"
      : `margin-bottom: 64px;`}/* margin-bottom: 64px; */
`
