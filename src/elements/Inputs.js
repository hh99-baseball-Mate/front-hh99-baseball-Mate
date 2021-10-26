import React from "react"
import styled from "styled-components"

export const Inputs = (props) => {
  const { type, value, placeholder, _onChange } = props

  const styles = { placeholder, type, value }

  return <Input {...styles} onChange={_onChange} />
}

Inputs.defaultProps = {
  placeholder: "입력",
  value: "",
  _onChange: () => {},
}

const Input = styled.input`
  box-sizing: border-box;
  height: 50px;
  border-radius: 30px;
  padding: 5px 15px;
  border: 1px solid #00000057;
  margin: 30px 0 0 0;
`
