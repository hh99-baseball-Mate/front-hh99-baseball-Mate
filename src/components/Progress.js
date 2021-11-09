import { width } from "dom-helpers";
import React from "react";
import styled from "styled-components";

const Progress = (props) => {
  const peopleLimit = props.group.peopleLimit;
  const canApplyNum = props.group.canApplyNum;

  console.log("프로그레스바",peopleLimit, canApplyNum)
  console.log(((peopleLimit-canApplyNum)/peopleLimit)*100 + "%")

  let width = ((peopleLimit-canApplyNum)/peopleLimit)*100
  if (width > 100) {
    width = 100;
  }

  return (
    <ProgresBar>
      <HighLight
        width={width+"%"}
      />
    </ProgresBar>
  );
};

export default Progress;

const ProgresBar = styled.div`
  background: #e7e7e7;
  width: 230px;
  height: 1.6px;
`;

const HighLight = styled.div`
  background: #ff4b38;
  width: ${(props) => props.width};
  height: inherit;
`;
