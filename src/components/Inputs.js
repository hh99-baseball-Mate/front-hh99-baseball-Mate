import React from "react"
import styled from "styled-components"
import { Text } from "./Text"

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
    dropdown,
    textarea,
    label,
    onClick,
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
    dropdown,
    textarea,
    label,
    onClick,
  }

  if (dropdown) {
    return <Select {...styles}>{children}</Select>
  }
  if (textarea) {
    return (
      <InputBox>
        <Text margin="10px 0">{children}</Text>
        <TextArea maxLength="500" {...styles}></TextArea>
      </InputBox>
    )
  }

  return (
    <InputBox>
      <Text>{children}</Text>
      <Input {...styles} />
    </InputBox>
  )
}

Inputs.defaultProps = {
  children: null,
  name: "",
  width: "100%",
  placeholder: "입력",
  // value: "",
  margin: "10px 0",
  autoComplete: "off",
  dropdown: false,
  textarea: false,
  label: "",
}

const InputBox = styled.div`
  margin-top: 20px;
`

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
  :focus {
    outline: none !important;
    border-bottom: 2px solid #f25343;
  }
`
const Select = styled.select`
  box-sizing: border-box;
  border: none;
  height: 30px;
  margin: ${(props) => props.margin};
  text-align: center;
  background-color: #fff;
  :focus {
    outline: none !important;
    border-bottom: 2px solid #f25343;
  }
`
const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid #e7e7e7;
  box-sizing: border-box;
  border-radius: 10px;
  resize: none;
  height: 150px;
  padding: 10px;
  :focus {
    outline: none !important;
    border: 2px solid #f25343;
  }
`
