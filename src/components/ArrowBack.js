import React from "react";
import { IoIosArrowBack } from "react-icons/io"
import styled from "styled-components"
import { history } from "../redux/configStore"

export const ArrowBack = (props) => {
  const { children, onClick, bg } = props

  const styles = { onClick, bg }

  return (
    <Headers bg={bg}>
      <IoIosArrowBack
        style={{ position: "absolute", left: "20px" }}
        {...styles}
        onClick={() => history.goBack()}
      />
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
  display: flex;
  justify-content: center;
  position: relative;
  cursor: pointer;
  padding: 20px 0;
  margin: 0 -20px;
  ${(props) => (props.bg ? "background-color:#EC5E4F; color:white;" : null)}
`
