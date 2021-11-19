import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import styled from "styled-components";
import { history } from "../redux/configStore";
import { Text } from "."

export const ArrowBack = (props) => {
  const { children, onClick, bg } = props

  const styles = { onClick, bg }

  return (
    <Headers bg={bg}>
      <Icon {...styles} onClick={() => history.goBack()} />
      {children}
    </Headers>
  )
}

ArrowBack.defaultProps = {
  children: null,
  _onClick: () => {},
  bg: null,
}

const Headers = styled.div`
  /* width: 335px; */
  display: flex;
  justify-content: center;
  position: relative;
  cursor: pointer;
  padding: 20px 0;
  font-size: 16px;
  font-weight: bold;

  ${(props) =>
    props.bg
      ? "background-color:#EC5E4F; color:white; width:425px;  margin: 0 auto;"
      : null}
`

const Icon = styled(IoIosArrowBack)`
  position: absolute;
  left: 0px;
  margin-left: 20px;
`
