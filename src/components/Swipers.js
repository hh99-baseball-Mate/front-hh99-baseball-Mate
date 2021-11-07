import React from "react";
import styled from "styled-components";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

const Swipers = (props) => {
  const { children, height } = props;
  return (
    <>
      <Sw>{children}</Sw>
    </>
  );
};

export default Swipers;

Swipers.defaultProps = {
  children: null,
  // height: ${(props) => props.height};
};

const Sw = styled.div`
  overflow: auto hidden;
  display: flex;
  align-items: center;
  min-height: 120px;
`;
