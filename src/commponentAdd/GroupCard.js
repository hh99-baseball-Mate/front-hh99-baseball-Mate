import React from "react";
import styled from "styled-components";
import { Image } from "react-bootstrap";

const GroupCard = (props) => {
  return (
    <Box>
      <ImgBall src="holder.js/171x180" rounded />
    </Box>
  );
};

export default GroupCard;

const Box = styled.div`
  width: 335px;
  height: 134px;
  left: 20px;
  top: 184px;
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

const ImgBall = styled.image``;
