import React from "react"
import styled from "styled-components"
import { Text } from "."

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
    submit,
    ref,
    social,
  } = props

  const styles = {
    children,
    margin,
    bg,
    color,
    border,
    width,
    disable,
    submit,
    ref,
    social,
  }

  if (submit) {
    return (
      <SubmitButton onClick={_onClick} {...styles}>
        <Text color="#fff" bold>
          {children}
        </Text>
      </SubmitButton>
    )
  }

  if (social) {
    return (
      <SocialButton onClick={_onClick} {...styles}>
        <Text color="#F25343" bold>
          {children}
        </Text>
      </SocialButton>
    )
  }

  return (
    <DefaultButton onClick={_onClick} {...styles}>
      <Text color="#F25343" bold>
        {children}
      </Text>
    </DefaultButton>
  )
}

Buttons.defaultProps = {
  children: null,
  margin: "7px 0",
  _onClick: () => {},
  bg: false,
  border: "none",
  disable: false,
  submit: false,
  width: "100%",
  social: false,
}

const DefaultButton = styled.button`
  box-sizing: border-box;
  width: ${(props) => props.width};
  height: 50px;
  border-radius: 80px;
  border: 1px solid #ec5e4f;
  margin: ${(props) => props.margin};
  background-color: ${(props) => (props.bg ? props.bg : "#fff")};
  cursor: pointer;
`
const SubmitButton = styled.button`
  box-sizing: border-box;
  width: ${(props) => props.width};
  height: 50px;
  border-radius: 80px;
  border: 1px solid #ec5e4f;
  margin: ${(props) => props.margin};
  background-color: #f25343;
  cursor: pointer;
`
const SocialButton = styled.button`
  box-sizing: border-box;
  width: ${(props) => props.width};
  height: 50px;
  border-radius: 80px;
  border: none;
  margin: ${(props) => props.margin};
  background-color: ${(props) => (props.bg ? props.bg : "#fff")};
  cursor: pointer;
`
