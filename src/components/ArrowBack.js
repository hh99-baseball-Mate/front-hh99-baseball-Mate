import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Text } from ".";
import styled from "styled-components";

export const ArrowBack = (props) => {
  const { children, onClick } = props;

  const styles = { onClick };

  return (
    <Headers>
      <IoIosArrowBack
        style={{ position: "absolute", left: "0px", top: "5px" }}
        {...styles}
      />
      <Text size="16px" center>
        {children}
      </Text>
    </Headers>
  );
};

ArrowBack.defaultProps = {
  children: null,
  _onClick: () => {},
};

const Headers = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  cursor: pointer;
  margin: 20px 0;
`;
