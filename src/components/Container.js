import React from "react";
import styled from "styled-components";

export const Container = (props) => {
  const { children, margin, position } = props;
  const styles = { margin, position };

  return <MainContainer {...styles}>{children}</MainContainer>;
};

Container.defaultPorps = {
  children: null,
  margin: "0px auto",
  position: "absolute",
};

const MainContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 90%;
`;
