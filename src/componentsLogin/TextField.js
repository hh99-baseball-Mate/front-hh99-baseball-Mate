import React from "react"
import { Inputs } from "../components"
import { ErrorMessage, useField } from "formik"
import styled from "styled-components"

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <InputBox>
      <label htmlFor={field.name}>{label}</label>
      <Input type={props.type} {...field} {...props} />

      <ErrorMessage name={field.name} />
    </InputBox>
  )
}

const InputBox = styled.div`
  margin: 20px 0;
`
const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #e7e7e7;
  height: 30px;
  margin-top: 20px;
  ::placeholder {
    color: #c4c4c4;
    font-size: 12px;
  }
  :focus {
    outline: none !important;
    border-bottom: 2px solid #f25343;
  }
`
