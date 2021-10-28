import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { timelineCreators } from "../redux/modules/timeline";

const TimelimeWrite = (props) => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");

  const addTimeline = () => {
    dispatch(
      timelineCreators.addTimelineMW(message)
    );
  };

  return (
    <React.Fragment>
      <Container>
        {/* <input type="text" cols="40" rows="10" type="content"/> */}
        <textarea  cols="50" rows="2"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></textarea>
        <button onClick={() => {addTimeline()}}
				>타임라인 작성</button>
      </Container>
    </React.Fragment>
  );
};

export default TimelimeWrite;

const Container = styled.div`
  width: 335px;
  /* height: 177px; */
  margin: 20px auto;
`;

const Warp = styled.div`
  /* width: 100%; */
  display: ${(props) => props.flex};
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  margin-left: ${(props) => props.marginLeft};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  position: ${(props) => props.position};
`;

const Text = styled.div`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
  letter-spacing: ${(props) => props.spacing};
  margin: ${(props) => props.margin};
`;

const TimeLineCard = styled.div`
  /* width: 300px; */
  height: 50px;
  text-align: center;
  background-color: #ffdeeb;
  margin: auto;
  margin-top: 12px;
  border-radius: 10px;
`;
