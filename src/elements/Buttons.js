import React from "react"
import styled from "styled-components"

export const Buttons = (props) => {
  const { children, margin, _onClick, bg, color, border } = props

  const styles = { children, margin, bg, color, border }

  return (
    <>
      <Button onClick={_onClick} {...styles}>
        {children}
      </Button>
    </>
  )
}

Buttons.defaultProps = {
  children: null,
  margin: "7px 0",
  _onClick: () => {},
  bg: false,
  text: false,
  border: "none",
}

const Button = styled.button`
  box-sizing: border-box;
  height: 50px;
  border-radius: 80px;
  border: ${(props) => props.border};
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.bg};
  color: ${(props) => props.color};
`
