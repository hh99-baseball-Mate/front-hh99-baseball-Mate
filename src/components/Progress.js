import { width } from "dom-helpers";
import React from "react";
import styled from "styled-components";

const Progress = ({ hotPercent }) => {
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

export default Progress;

const ProgresBar = styled.div`
  background: #e7e7e7;
  width: 70%;
  height: 1.6px;
`;

const HighLight = styled.div`
  background: #ff4b38;
  width: ${(props) => props.width};
  height: inherit;
`;
