import React from "react"
import styled from "styled-components"

export const Banner = ({ children, bg }) => {
  return <BannerContainer bg={bg}>{children}</BannerContainer>
}
Banner.defaultProps = {
  bg: false,
}

const BannerContainer = styled.div`
  margin: 0 auto;
  max-width: 375px;
  height: 106px;
  background-color: ${(props) => props.bg};
  box-sizing: border-box;
`
