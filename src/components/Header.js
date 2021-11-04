import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Header = (props) => {
  const history = useHistory();

  const { nowBtn1, nowBtn2, nowBtn3, nowBtn4 } = props;

  return (
    <Container minWidth="370px">
      <Box>
        <Button1
          nowBtn1={nowBtn1}
          onClick={() => {
            history.push("/");
          }}
        >
          추천
        </Button1>

        <Button2
          nowBtn2={nowBtn2}
          onClick={() => {
            history.push("/grouplist");
          }}
        >
          모임
        </Button2>

        <Button3
          nowBtn3={nowBtn3}
          onClick={() => {
            history.push("/timeline");
          }}
        >
          타임라인
        </Button3>

        <Button4
          nowBtn4={nowBtn4}
          onClick={() => {
            history.push("/goods");
          }}
        >
          굿즈
        </Button4>
      </Box>
    </Container>
  );
};

Header.defaultProps = {
  nowBtn1: false,
  nowBtn2: false,
  nowBtn3: false,
  nowBtn4: false,
};

export default Header;

const Container = styled.div`
  width: 375px;
  margin: auto;
  padding: 0;
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 250px;
  /* margin-bottom: 11px; */
  margin-left: 26px;
  margin-top: 30px;
`;

const Button1 = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  margin-right: 0;
  padding-bottom: 10px;
  background: none;
  color: rgba(0, 0, 0, 0.5);

  ${(props) =>
    props.nowBtn1 &&
    `
    border-bottom: 2px solid;
    font-weight: bold;
    color: #000000;
  `}
`;

const Button2 = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  margin-right: 0;
  padding-bottom: 10px;
  background: none;
  color: rgba(0, 0, 0, 0.5);

  ${(props) =>
    props.nowBtn2 &&
    `
    border-bottom: 2px solid;
    font-weight: bold;
    color: #000000;
  `}
`;

const Button3 = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  margin-right: 0;
  padding-bottom: 10px;
  background: none;
  color: rgba(0, 0, 0, 0.5);

  ${(props) =>
    props.nowBtn3 &&
    `
    border-bottom: 2px solid;
    font-weight: bold;
    color: #000000;
  `}
`;

const Button4 = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  margin-right: 0;
  padding-bottom: 10px;
  background: none;
  color: rgba(0, 0, 0, 0.5);

  ${(props) =>
    props.nowBtn4 &&
    `
    border-bottom: 2px solid;
    font-weight: bold;
    color: #000000;
  `}
`;
