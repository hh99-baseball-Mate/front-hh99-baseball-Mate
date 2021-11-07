import React from "react";
import styled from "styled-components";
import { Image } from "react-bootstrap";

const GroupCard = (props) => {
  return (
    <div>
      <Box>
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxDZ4WmsvL0lvEzv8UrFD3zGtNw6FLWLNr9Q&usqp=CAU"
          rounded
          style={{ width: "76px", height: "76px", borderRadius: "6px" }}
        />
      </Box>
    </div>
  );
};

export default GroupCard;

const Box = styled.div`
  width: 335px;
  height: 134px;
  margin: 0 auto;

  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

const ImgBall = styled.image`
  width: 76px;
  height: 76px;
  background-color: yellowgreen;
  /* right: 243px;
  bottom: 42px; */
  border-radius: 6px;
  /* background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxDZ4WmsvL0lvEzv8UrFD3zGtNw6FLWLNr9Q&usqp=CAU"); */
`;
