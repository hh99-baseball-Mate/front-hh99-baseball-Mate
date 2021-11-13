import React from "react"
import styled from "styled-components"

export const Banner = (props) => {
  const { children, bg } = props

  const styles = { bg }

  return <BannerContainer {...styles}>{children}</BannerContainer>
}
Banner.defaultProps = {
  bg: false,
  children: null,
}

const BannerContainer = styled.div`
  margin: 20px auto 10px;
  max-width: 375px;
  height: 106px;
  background-color: ${(props) => (props.bg ? "#f25343" : "#e7e7e7")};
  box-sizing: border-box;
`
