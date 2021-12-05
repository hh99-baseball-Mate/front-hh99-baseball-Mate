import React from "react"
import styled from "styled-components"

import "swiper/swiper-bundle.min.css"
import "swiper/swiper.min.css"

export const Swipers = (props) => {
  // 커스텀 스와이퍼
  const { children, height } = props
  return (
    <>
      <Sw height={height}>{children}</Sw>
    </>
  )
}

Swipers.defaultProps = {
  children: null,
  height: "120px",
  // height: ${(props) => props.height};
}

const Sw = styled.ul`
  overflow: scroll hidden;
  display: flex;
  align-items: center;
  min-height: ${(props) => props.height};
`
