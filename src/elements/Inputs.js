import React from "react"
import styled from "styled-components"

export const Inputs = (props) => {
  const { type, value, placeholder, _onChange, margin, width } = props

  const styles = { placeholder, type, value, margin, width }

  return <Input {...styles} onChange={_onChange} />
}

Inputs.defaultProps = {
  width: "100%",
  placeholder: "입력",
  value: "",
  margin: "12px 0",
  _onChange: () => {},
}

const Input = styled.input`
  width: ${(props) => props.width};
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #e7e7e7;
  height: 30px;
  margin: ${(props) => props.margin};
  ::placeholder {
    color: #c4c4c4;
  }
`
