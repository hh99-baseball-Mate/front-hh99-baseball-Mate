import React from "react"
import styled from "styled-components"

export const Buttons = (props) => {
  const { children, margin, _onClick } = props

  return (
    <>
      <Button onClick={_onClick} margin={margin}>
        {children}
      </Button>
    </>
  )
}

Buttons.defaultProps = {
  children: null,
  margin: null,
  _onClick: () => {},
}

const Button = styled.button`
  box-sizing: border-box;
  height: 50px;
  border-radius: 30px;
  border: 1px solid #00000057;
  margin: ${(props) => props.margin};
`
