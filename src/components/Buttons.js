import React from "react"
import styled from "styled-components"

export const Buttons = (props) => {
  const {
    children,
    margin,
    _onClick,
    bg,
    color,
    border,
    width,
    disable,
    complete,
    ref,
  } = props

  const styles = {
    children,
    margin,
    bg,
    color,
    border,
    width,
    disable,
    complete,
    ref,
  }

  return (
    <div>
      <Button onClick={_onClick} {...styles}>
        {children}
      </Button>
    </div>
  )
}

Buttons.defaultProps = {
  children: null,
  margin: "7px 0",
  _onClick: () => {},
  bg: false,
  text: false,
  border: "none",
  disable: false,
  complete: false,
  width: "100%",
}

const Button = styled.button`
  box-sizing: border-box;
  width: ${(props) => props.width};
  height: 50px;
  border-radius: 80px;
  border: ${(props) => props.border};
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.bg};
  ${(props) => (props.complete ? "background:#F25343; color:#fff" : "")}
`
