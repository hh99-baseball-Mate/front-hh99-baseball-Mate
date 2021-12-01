import React from "react"
import styled from "styled-components"

export const Text = (props) => {
  const { bold, color, size, margin, children, center } = props
  const styles = {
    bold: bold,
    color: color,
    size: size,
    margin: margin,
    center,
  }
  return <P {...styles}>{children}</P>
}

Text.defaultProps = {
  children: null,
  bold: false,
  color: "#000",
  size: "14px",
  margin: "0",
  center: false,
}

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? "700" : "500")};
  margin: ${(props) => props.margin};
  ${(props) => (props.center ? "text-align:center;" : "")};
`
