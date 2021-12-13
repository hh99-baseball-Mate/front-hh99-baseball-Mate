import React from "react"
import styled from "styled-components"

export const Progress = ({ hotPercent }) => {
  let progress = hotPercent
  if (progress > 100) {
    progress = 100
  }

  return (
    <ProgresBar>
      <HighLight width={progress + "%"} />
    </ProgresBar>
  )
}

const ProgresBar = styled.div`
  background: #e7e7e7;
  width: 70%;
  height: 1.6px;

  @media screen and (max-width: 360px) {
    width: 60%;
  }
`

const HighLight = styled.div`
  background: #ff4b38;
  width: ${(props) => props.width};
  height: inherit;
`
