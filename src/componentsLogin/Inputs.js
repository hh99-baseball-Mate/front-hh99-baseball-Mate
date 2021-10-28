import React from "react"
import styled from "styled-components"
import { Text } from "./Text"
// import { AiOutlineCheckCircle } from "react-icons/ai"

export const Inputs = (props) => {
  const {
    type,
    value,
    placeholder,
    onChange,
    margin,
    width,
    name,
    children,
    autoComplete,
  } = props

  const styles = {
    placeholder,
    type,
    value,
    margin,
    width,
    name,
    onChange,
    autoComplete,
  }

  return (
    <>
      <Text>{children}</Text>
      <Input {...styles} />
    </>
  )
}

Inputs.defaultProps = {
  children: null,
  name: "",
  width: "100%",
  placeholder: "입력",
  value: "",
  margin: "12px 0",
  autoComplete: "off",
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
    font-size: 12px;
  }
`
