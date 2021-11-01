import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Header = (props) => {
  const history = useHistory();

  return (
    <React.Fragment>
      <Box>
        <NowBtn>
          <Text
            weight="bold"
            color="#000000"
            onClick={() => {
              history.push("/");
            }}
          >
            추천
          </Text>
        </NowBtn>

        <Button>
          <Text
            color="rgba(0, 0, 0, 0.5)"
            onClick={() => {
              history.push("/grouplist");
            }}
          >
            모임
          </Text>
        </Button>

        <Button>
          <Text
            color="rgba(0, 0, 0, 0.5)"
            onClick={() => {
              history.push("/timeline");
            }}
          >
            타임라인
          </Text>
        </Button>

        <Button>
          <Text color="rgba(0, 0, 0, 0.5)">굿즈</Text>
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default Header;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 250px;
  /* margin-bottom: 11px; */
  margin-left: 26px;
`;

const NowBtn = styled.button`
  margin-right: 0;
  padding-bottom: 10px;
  border: none;
  border-bottom: 2px solid;
  background: none;
`;

const Button = styled.button`
  background: none;
  border: none;
`;

const Text = styled.div`
  font-size: 20px;
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
  letter-spacing: ${(props) => props.spacing};
  /* margin-right: 20px; */
`;
