import React from "react"
import { Text } from "../components"
import { AiOutlineCamera } from "react-icons/ai"
import styled from "styled-components"

export const Picture = (props) => {
  const { children, basic, onChange } = props

  const styles = { onChange, basic }

  if (basic) {
    return (
      <>
        <LabelBox htmlFor="picture">
          <div style={{ display: "block" }}>
            <AiOutlineCamera size="34px" color="#777777" />
            <Text color="#777777" center>
              {children}
            </Text>
          </div>
        </LabelBox>
        <Inputs
          id="picture"
          type="file"
          accept="image/png, image/jpeg"
          multiple
          {...styles}
        />
      </>
    )
  }

  return (
    <>
      <LabelBox for="picture"></LabelBox>
      <Inputs id="picture" type="file" accept="image/png, image/jpeg" />
    </>
  )
}

Picture.defaultProps = {
  children: null,
  basic: false,
}

const LabelBox = styled.label`
  width: 82px;
  height: 82px;
  border: 1px solid #e7e7e7;
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
const Inputs = styled.input`
  display: none;
`